import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getSimilarProduct } from '@/services/productService';

export const GET = errorHandler(async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get('slug') || '';

  return new SuccessResponse({
    message: 'Create a product success',
    metadata: await getSimilarProduct(slug),
  }).send(NextResponse);
});
