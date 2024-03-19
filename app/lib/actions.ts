'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/client';
import { put, del, BlobAccessError } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateJobFormSchema, CompanyFormSchema } from './schemas';
import type { CreateJobFormState, CompanyFormState } from './types';
import { Job, Company } from '@prisma/client';

export async function signInWithProvider(providerId: string, prevState: string | undefined) {
  try {
    await signIn(providerId);
  } catch (error) {
    if (error instanceof AuthError) {
      return `Authentication error: Failed to sign in with ${providerId}`;
    }
    throw error;
  }
}

export async function createJob(
  prevState: CreateJobFormState,
  formData: FormData
): Promise<CreateJobFormState> {
  const validatedFields = CreateJobFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      errorMsg: 'Invalid fields. Fix the errors and click the submit button again',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const user = (await auth())?.user;
  if (!user) throw Error('Not authorized access. Cannot create a job');
  const values = validatedFields.data;
  try {
    await prisma.job.create({ data: { userId: user.id as string, ...values } });
  } catch (error) {
    return {
      errorMsg: 'Database error: Failed to create a job',
    };
  }
  revalidatePath('/');
  redirect('/dashboard/jobs');
}

export async function editJob(
  id: string,
  creatorId: Job['userId'],
  prevState: CreateJobFormState,
  formData: FormData
): Promise<CreateJobFormState> {
  const validatedFields = CreateJobFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      errorMsg: 'Invalid fields. Fix the errors and click the submit button again',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const user = (await auth())?.user;
  if (!user || user.id !== creatorId) {
    throw Error('Not authorized access. Cannot edit a job');
  }
  const data = validatedFields.data;
  try {
    await prisma.job.update({
      where: { id },
      data,
    });
  } catch (error) {
    return { errorMsg: 'Database error: Failed to edit a job' };
  }
  revalidatePath('/');
  redirect('/dashboard/jobs');
}

export async function deleteJob(id: string, creatorId: Job['userId']) {
  const user = (await auth())?.user;
  if (!user || user.id !== creatorId) {
    throw Error('Not authorized access. Cannot delete a job');
  }
  try {
    await prisma.job.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (error) {
    throw Error('Database error: Failed to delete a job');
  }
}

export async function upsertCompany(
  existingLogoUrl: Company['logoUrl'],
  prevState: CompanyFormState,
  formData: FormData
): Promise<CompanyFormState> {
  const validatedFields = CompanyFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      errorMsg: 'Invalid fields. Fix the errors and click the submit button again',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const user = (await auth())?.user;
  if (!user) {
    throw Error('Not authorized access. Cannot upsert company');
  }
  const { logo, ...rest } = validatedFields.data;
  let logoUrl: Company['logoUrl'] = null;
  try {
    if (logo) {
      if (existingLogoUrl) {
        await del(existingLogoUrl);
      }
      const blob = await put(`company_logos/${logo.name}`, logo, {
        access: 'public',
      });
      logoUrl = blob.url;
    }
    await prisma.company.upsert({
      where: { userId: user.id },
      update: { ...(logoUrl ? { logoUrl } : {}), ...rest },
      create: { userId: user.id as string, logoUrl, ...rest },
    });
  } catch (error) {
    if (error instanceof BlobAccessError) {
      return { errorMsg: 'Storage error: Failed to download a file' };
    }
    return { errorMsg: 'Database error: Failed to upsert company' };
  }
  revalidatePath('/');
  redirect('/dashboard');
}
