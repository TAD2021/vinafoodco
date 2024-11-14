import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getTags } from '@/services/tagService';

export const GET = errorHandler(async () => {
  return new SuccessResponse({
    message: 'Get tags success',
    metadata: await getTags(),
  }).send(NextResponse);
});
