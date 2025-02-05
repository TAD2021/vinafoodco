import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getPost, updatePost, deletePost } from '@/services/postService';

export const GET = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const slug = pathParts[3];
  return new SuccessResponse({
    message: 'Get post list',
    metadata: await getPost(slug),
  }).send(NextResponse);
});

export const PATCH = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const slug = pathParts[3];
  const reqBody = await req.json();

  return new SuccessResponse({
    message: 'Get post list',
    metadata: await updatePost(slug, reqBody),
  }).send(NextResponse);
});

export const DELETE = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];

  return new SuccessResponse({
    message: 'delete post success',
    metadata: deletePost(id),
  }).send(NextResponse);
});
