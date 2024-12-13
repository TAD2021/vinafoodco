import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { createPost, getPosts } from '@/services/postService';

export const GET = errorHandler(async () => {
  return new SuccessResponse({
    message: 'Get posts success',
    metadata: await getPosts(),
  }).send(NextResponse);
});

export const POST = errorHandler(async (req) => {
  const reqBody = await req.json();
  return new SuccessResponse({
    message: 'Create post success',
    metadata: await createPost(reqBody),
  }).send(NextResponse);
});
