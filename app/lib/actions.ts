'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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
