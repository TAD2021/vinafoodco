import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getProductByPages, getToTalProducts } from '@/services/productService';
import { BadRequestError } from '@/core/error.response';

export const GET = errorHandler(async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  const pageNum = parseInt(page);
  const pageSize = parseInt(limit);

  if (isNaN(pageNum) || isNaN(pageSize) || pageNum < 1 || pageSize < 1) {
    throw new BadRequestError('Invalid page or limit');
  }

  const data = await getProductByPages(pageNum, pageSize);

  return new SuccessResponse({
    message: 'Get products success',
    metadata: data,
  }).send(NextResponse);
});
