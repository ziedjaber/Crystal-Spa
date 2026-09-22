import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * Common Security Headers applied to every API response
 */
const API_SECURITY_HEADERS: Record<string, string> = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

/**
 * Standard Success API Response
 */
export function successResponse<T>(data: T, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    {
      status,
      headers: API_SECURITY_HEADERS,
    }
  );
}

/**
 * Standard Error API Response
 */
export function errorResponse(
  error: string | ZodError | Error | unknown,
  status: number = 400,
  customMessage?: string
) {
  let errorMessage = 'An unexpected error occurred. Please try again.';
  let validationDetails: Record<string, string[]> | undefined = undefined;

  if (error instanceof ZodError) {
    status = 422;
    errorMessage = customMessage || 'Validation failed. Please check your submitted inputs.';
    validationDetails = error.flatten().fieldErrors as Record<string, string[]>;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error) {
    // Only expose raw error message in development; generic safe message in production
    if (process.env.NODE_ENV === 'development') {
      errorMessage = error.message;
    } else {
      errorMessage = customMessage || 'Service temporarily unavailable. Please try again later.';
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      ...(validationDetails ? { details: validationDetails } : {}),
      timestamp: new Date().toISOString(),
    },
    {
      status,
      headers: API_SECURITY_HEADERS,
    }
  );
}

/**
 * Rate Limit Exceeded Response (429)
 */
export function rateLimitResponse(retryAfterSeconds: number = 60) {
  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests. Please slow down and try again shortly.',
      retryAfter: retryAfterSeconds,
      timestamp: new Date().toISOString(),
    },
    {
      status: 429,
      headers: {
        ...API_SECURITY_HEADERS,
        'Retry-After': String(retryAfterSeconds),
      },
    }
  );
}
