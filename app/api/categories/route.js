import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { createCategory, getCategories } from '@/services/categoryService';

export const GET = errorHandler(async () => {
  return new SuccessResponse({
    message: 'Get categories success',
    metadata: await getCategories(),
  }).send(NextResponse);
});

export const POST = errorHandler(async (req) => {
  const reqBody = await req.json();
  return new SuccessResponse({
    message: 'Get categories success',
    metadata: await createCategory(reqBody),
  }).send(NextResponse);
});
