import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/client';
import authConfig from '@/auth.config';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { Role } from '@prisma/client';
import { fetchUser } from '@/app/lib/data';

declare module 'next-auth' {
  interface User {
    role: Role;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    GitHub({
      async profile(profile) {
        let role: Role = 'USER';
        const user = await fetchUser(profile.email as string);
        if (user) role = user.role;
        return {
          id: profile.node_id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role,
        };
      },
    }),
    Google({
      async profile(profile) {
        let role: Role = 'USER';
        const user = await fetchUser(profile.email as string);
        if (user) role = user.role;
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role,
        };
      },
    }),
  ],
});
