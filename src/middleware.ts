import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  {
    path: '/view/sign-in',
    whenAuthenticated: 'redirect',
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/view/sign-in';
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = '/view/dashboard';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path == path);
  const authToken = req.cookies.get('better-auth.session_token');

  if (!authToken && !publicRoute) {
    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute) {
    const redirectUrl = req.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (publicRoute) {
    return NextResponse.next();
  }

  if (path == '/') {
    return NextResponse.redirect(new URL('http://localhost:3000/view/dashboard'));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ['/', '/view/:path', '/api/:path'],
};
