'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/client';
import { put, del, BlobAccessError } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateJobFormSchema } from './schemas';
import type { CreateJobFormState } from './types';
import { Job } from '@prisma/client';

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
  const { companyLogo, ...rest } = validatedFields.data;
  let companyLogoUrl: string | undefined;
  try {
    if (companyLogo) {
      const blob = await put(`company_logos/${companyLogo.name}`, companyLogo, {
        access: 'public',
      });
      companyLogoUrl = blob.url;
    }
    await prisma.job.create({ data: { userId: user.id as string, companyLogoUrl, ...rest } });
  } catch (error) {
    if (error instanceof BlobAccessError) {
      return { errorMsg: 'Storage error: Failed to download a file' };
    }
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
  existingCompanyLogoUrl: Job['companyLogoUrl'],
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
  const { companyLogo, ...rest } = validatedFields.data;
  let companyLogoUrl: string | undefined;
  try {
    if (companyLogo) {
      if (existingCompanyLogoUrl) {
        await del(existingCompanyLogoUrl);
      }
      const blob = await put(`company_logos/${companyLogo.name}`, companyLogo, {
        access: 'public',
      });
      companyLogoUrl = blob.url;
    }
    await prisma.job.update({
      where: { id },
      data: { ...(companyLogoUrl ? { companyLogoUrl } : {}), ...rest },
    });
  } catch (error) {
    if (error instanceof BlobAccessError) {
      return { errorMsg: 'Storage error: Failed to download a file' };
    }
    return { errorMsg: 'Database error: Failed to edit a job' };
  }
  revalidatePath('/');
  redirect('/dashboard/jobs');
}

export async function deleteJob(
  id: string,
  creatorId: Job['userId'],
  companyLogoUrl: Job['companyLogoUrl']
) {
  const user = (await auth())?.user;
  if (!user || user.id !== creatorId) {
    throw Error('Not authorized access. Cannot delete a job');
  }
  try {
    if (companyLogoUrl) {
      await del(companyLogoUrl);
    }
    await prisma.job.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (error) {
    if (error instanceof BlobAccessError) {
      throw Error('Storage error: Failed to delete a file');
    }
    throw Error('Database error: Failed to delete a job');
  }
}
