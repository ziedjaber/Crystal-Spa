import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Global Edge Security Middleware
 * 
 * Features:
 * 1. Unique Request ID Tracking (x-request-id) for security audit tracing.
 * 2. CSRF Origin & Referer Verification on mutation endpoints.
 * 3. Max Payload Protection against memory-exhaustion DoS attacks.
 * 4. Stripe Webhook Path Exemption from standard CSRF checks.
 */

const MAX_PAYLOAD_BYTES = 1024 * 1024; // 1 Megabyte maximum

export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  // 1. Enforce payload size limit on incoming mutation requests
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      {
        success: false,
        error: 'Payload Too Large. Maximum allowed size is 1MB.',
        requestId,
      },
      { status: 413 }
    );
  }

  // 2. CSRF Protection for state-changing requests (POST, PUT, DELETE, PATCH)
  const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
  const isStripeWebhook = pathname.startsWith('/api/stripe/webhook');

  if (isMutation && !isStripeWebhook && pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('host');

    // In production, verify that Origin or Referer matches the application Host
    if (process.env.NODE_ENV === 'production' && host) {
      const isValidOrigin = origin && (origin.includes(host) || origin.includes('localhost'));
      const isValidReferer = referer && (referer.includes(host) || referer.includes('localhost'));

      if (!isValidOrigin && !isValidReferer) {
        return NextResponse.json(
          {
            success: false,
            error: 'Cross-Site Request Forgery (CSRF) verification failed. Untrusted origin.',
            requestId,
          },
          { status: 403 }
        );
      }
    }
  }

  // 3. Clone response and attach security tracking headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('x-request-id', requestId);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files and image optimization:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (.png, .jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
