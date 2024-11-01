import { authentication } from '@/auth/authUtils';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { handlerRefreshToken } from '@/services/accessService';
import { NextResponse } from 'next/server';

export const POST = errorHandler(async (req) => {
  await authentication(req);
  const requestBody = await req.json();

  // Gọi handlerRefreshToken với refreshToken
  const tokenMetadata = await handlerRefreshToken(requestBody.refreshToken);

  return new SuccessResponse({
    message: 'Get token success!',
    metadata: tokenMetadata,
  }).send(NextResponse);
});
