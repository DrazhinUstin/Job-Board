'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/client';
import { put, BlobAccessError } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateJobFormSchema } from './schemas';
import type { CreateJobFormState } from './types';

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
  revalidatePath('/jobs');
  redirect('/jobs');
}
