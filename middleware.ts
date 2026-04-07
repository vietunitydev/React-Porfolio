import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './src/i18n/routing';
import {ADMIN_SESSION_COOKIE, isValidAdminSession} from './src/lib/admin-auth';

const intlMiddleware = createMiddleware(routing);

const PUBLIC_ADMIN_API_PATHS = new Set(['/api/admin/login', '/api/admin/session']);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = isValidAdminSession(sessionToken);
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

  if (pathname === '/' && !localeCookie) {
    return NextResponse.redirect(new URL('/vi', request.url));
  }

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin')) {
    if (PUBLIC_ADMIN_API_PATHS.has(pathname)) {
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        {success: false, message: 'Unauthorized'},
        {status: 401}
      );
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/api/admin/:path*', '/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
