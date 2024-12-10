import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { createTag, getTags } from '@/services/tagService';
import { BadRequestError } from '@/core/error.response';

export const GET = errorHandler(async () => {
  return new SuccessResponse({
    message: 'Get tags success',
    metadata: await getTags(),
  }).send(NextResponse);
});

export const POST = errorHandler(async (req) => {
  const { name } = await req.json();

  if (!name) {
    throw new BadRequestError('Tag name is required');
  }

  return new SuccessResponse({
    message: 'Get tags success',
    metadata: await createTag(name),
  }).send(NextResponse);
});
