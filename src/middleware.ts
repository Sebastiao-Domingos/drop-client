import { NextRequest, NextResponse, userAgent } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
  default-src 'self';
  frame-ancestors 'none';
  img-src 'self' https://cdnjs.cloudflare.com;
  font-src 'self' https://cdn.jsdelivr.net https://fonts.gstatic.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' 'nonce-${nonce}' 'strict-dynamic';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
  style-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css https://fonts.googleapis.com/css2;
  `;

  // style-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-${nonce}' cdn.jsdelivr.net fonts.googleapis.com api.mapbox.com;
  // img-src 'self' blob: data:;
  // font-src 'self';
  // script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  // default-src 'self';
  // style-src 'self' 'nonce-${nonce}';
  // object-src 'none';
  // base-uri 'self';
  // form-action 'self';
  // frame-ancestors 'none';
  // upgrade-insecure-requests;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('X-Frame-Options', 'DENY');

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers:
        process.env.NODE_ENV !== 'development' ? requestHeaders : undefined,
    },
  });

  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  );

  const url = request.nextUrl.pathname;
  /*

  if (url.startsWith("/estafeta")) {
    if (userAgent(request).device.type === "mobile") {
      return NextResponse.next({
        request,
        headers:
          process.env.NODE_ENV !== "development" ? requestHeaders : undefined,
      }); //headers: requestHeaders
    } else {
      const searchParams = new URLSearchParams(
        request.nextUrl.searchParams.toString()
      );
      searchParams.append("url", encodeURIComponent(url));

      return NextResponse.redirect(
        new URL(`/mobile-required?${searchParams.toString()}`, request.url)
      );
    }
  }
  

  if (url.startsWith("/mobile-required")) {
    if (!request.nextUrl.searchParams.has("url")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      if (userAgent(request).device.type === "mobile") {
        return NextResponse.redirect(
          new URL(
            decodeURIComponent(request.nextUrl.searchParams.get("url")!),
            request.url
          )
        );
      }

      return NextResponse.next({
        request,
        headers:
          process.env.NODE_ENV !== "development" ? requestHeaders : undefined,
      }); //headers: requestHeaders
    }
  }*/

  return NextResponse.next({
    headers:
      process.env.NODE_ENV !== 'development' ? requestHeaders : undefined,
  });
}
