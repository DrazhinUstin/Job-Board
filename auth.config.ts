import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';

const privateRoutes = ['/profile', '/dashboard'];

export default {
  providers: [GitHub, Google],
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
    jwt({ token }) {
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
