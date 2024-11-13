import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getProductByCategory } from '@/services/productService';

export const GET = errorHandler(async () => {
  return new SuccessResponse({
    message: 'Get products success',
    metadata: await getProductByCategory(),
  }).send(NextResponse);
});
