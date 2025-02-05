import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getRating } from '@/services/ratingService';

export const GET = errorHandler(async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get('postId');
  const productId = searchParams.get('productId ');

  return new SuccessResponse({
    message: 'Get rating success',
    metadata: await getRating(postId, productId),
  }).send(NextResponse);
});
