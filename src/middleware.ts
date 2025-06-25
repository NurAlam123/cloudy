import { NextRequest, NextResponse } from 'next/server';
import auth from './lib/auth';

export async function middleware(request: NextRequest) {
  const user = await auth.getUser();

  if (!user) {
    request.cookies.delete('session');
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
