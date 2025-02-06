import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getProductsByCategory } from '@/services/productService';

export const GET = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const slug = pathParts[3];

  return new SuccessResponse({
    message: 'Get products success',
    metadata: await getProductsByCategory(slug),
  }).send(NextResponse);
});
