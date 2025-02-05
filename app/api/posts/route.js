import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { BadRequestError } from '@/core/error.response';
import { getPosts, createPost } from '@/services/postService';

export const GET = errorHandler(async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 5;
  const type = searchParams.get('type') || '';

  const pageNum = parseInt(page);
  const pageSize = parseInt(limit);

  if (isNaN(pageNum) || isNaN(pageSize) || pageNum < 1 || pageSize < 1) {
    throw new BadRequestError('Invalid page or limit');
  }

  return new SuccessResponse({
    message: 'Get post list',
    metadata: await getPosts({ pageNum, pageSize, type }),
  }).send(NextResponse);
});

export const POST = errorHandler(async (req) => {
  const reqBody = await req.json();
  console.log(reqBody);
  return new SuccessResponse({
    message: 'Create post success',
    metadata: await createPost(reqBody),
  }).send(NextResponse);
});
