import { NextRequest } from 'next/server';
import { SERVICES_DATA } from '@/data/services';
import { successResponse, errorResponse } from '@/lib/api-response';
import { sanitizeText, sanitizeObject } from '@/lib/sanitize';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCategory = searchParams.get('category');
    const rawSearch = searchParams.get('search');

    const category = rawCategory ? sanitizeText(rawCategory, 50) : null;
    const search = rawSearch ? sanitizeText(rawSearch, 100) : null;

    let filtered = [...SERVICES_DATA];

    if (category && category !== 'all') {
      filtered = filtered.filter((s) => s.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.fullDescription.toLowerCase().includes(q)
      );
    }

    return successResponse(sanitizeObject(filtered));
  } catch (error) {
    return errorResponse(error, 400, 'Failed to fetch services');
  }
}
