import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { deleteCategory } from '@/services/categoryService';

export const DELETE = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];

  return new SuccessResponse({
    message: 'Get categories success',
    metadata: await deleteCategory(id),
  }).send(NextResponse);
});
