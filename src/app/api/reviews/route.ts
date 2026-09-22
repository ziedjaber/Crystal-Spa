import { NextRequest } from 'next/server';
import { REVIEWS_DATA } from '@/data/services';
import { reviewRequestSchema } from '@/lib/validations/schemas';
import { successResponse, errorResponse, rateLimitResponse } from '@/lib/api-response';
import { checkRateLimit } from '@/lib/rate-limit';
import { isHoneypotTriggered } from '@/lib/captcha';
import { sanitizeText, sanitizeObject } from '@/lib/sanitize';
import { logger } from '@/lib/logger';

let inMemoryReviews = [...REVIEWS_DATA];

export async function GET() {
  const sanitizedReviews = sanitizeObject(inMemoryReviews);
  return successResponse(sanitizedReviews);
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting (5 reviews / 15 min per IP)
    const rateCheck = checkRateLimit(request, 'reviews-submit', {
      windowMs: 15 * 60 * 1000,
      maxRequests: 5,
    });
    if (rateCheck.isLimited) {
      logger.securityAudit('REVIEWS_RATE_LIMIT_HIT', { ip: request.headers.get('x-forwarded-for') });
      return rateLimitResponse(Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
    }

    const rawBody = await request.json();

    // 2. Honeypot check
    if (isHoneypotTriggered(rawBody.hp_fax_number)) {
      logger.securityAudit('SPAM_BOT_BLOCKED_HONEYPOT', { endpoint: '/api/reviews' });
      return successResponse(null, 'Avis enregistré.');
    }

    // 3. Schema validation
    const validated = reviewRequestSchema.parse(rawBody);

    const newRev = {
      id: `rev-${Date.now()}`,
      author: sanitizeText(validated.author, 80),
      role: 'Client Certifié Crystal Spa',
      rating: validated.rating,
      date: new Date().toLocaleDateString('fr-FR', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      comment: sanitizeText(validated.comment, 1500),
      treatmentName: sanitizeText(validated.treatmentName || 'Séjour Suite & Spa Privatif', 100),
    };

    inMemoryReviews.unshift(newRev);

    logger.info('New verified review submitted', {
      author: newRev.author,
      rating: newRev.rating,
    });

    return successResponse(newRev, 'Merci d’avoir partagé votre expérience avec notre communauté !', 201);
  } catch (error) {
    logger.error('Failed to submit review', error);
    return errorResponse(error, 400, 'Impossible d’enregistrer votre avis. Veuillez vérifier vos saisies.');
  }
}
