import NextAuth from 'next-auth';

import { authConfig } from '@/src/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// import { NextResponse, NextRequest } from 'next/server';
// import { get } from '@vercel/edge-config';

// const { auth } = NextAuth(authConfig);

// export function authenticate(req: any) {
//   return auth(req);
// }

// export async function middleware(req: NextRequest) {
//   if (req.nextUrl.pathname === '/create-invoices') {
//     const enable = await get('enable_feature_create_invoices');
//     return NextResponse.json(enable);
//   }  else {
//     return authenticate(req)
//   }
// }