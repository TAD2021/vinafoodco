import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { deletePost, getPost, updatePost } from '@/services/postService';

export const GET = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const slug = pathParts[3];

  return new SuccessResponse({
    message: 'Get categories success',
    metadata: await getPost(slug),
  }).send(NextResponse);
});

export const PUT = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];
  const reqBody = await req.json();

  return new SuccessResponse({
    message: 'Update post success',
    metadata: await updatePost(id, reqBody),
  }).send(NextResponse);
});

export const DELETE = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];

  return new SuccessResponse({
    message: 'Update post success',
    metadata: await deletePost(id),
  }).send(NextResponse);
});
