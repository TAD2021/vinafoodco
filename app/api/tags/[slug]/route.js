import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { deleteTag } from '@/services/tagService';

export const DELETE = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];

  return new SuccessResponse({
    message: 'Delete tag success',
    metadata: await deleteTag(id),
  }).send(NextResponse);
});
