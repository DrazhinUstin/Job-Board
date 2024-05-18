import type { NextAuthConfig } from 'next-auth';
import type { Role } from '@prisma/client';

const privateRoutes = ['/profile', '/dashboard'];

export default {
  providers: [],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ request, auth }) {
      const isSignIn = !!auth?.user;
      const isOnPrivate = privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
      const isOnAuth = request.nextUrl.pathname.startsWith('/auth');
      if (isOnPrivate) {
        if (isSignIn) {
          return true;
        }
        return false;
      }
      if (isSignIn && isOnAuth) {
        return Response.redirect(new URL('/profile', request.nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
