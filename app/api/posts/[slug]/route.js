import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getPost } from '@/services/postService';

export const GET = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const slug = pathParts[3];

  return new SuccessResponse({
    message: 'Get categories success',
    metadata: await getPost(slug),
  }).send(NextResponse);
});
