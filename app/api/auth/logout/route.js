import { authentication } from '@/auth/authUtils';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { logout } from '@/services/accessService';
import { NextResponse } from 'next/server';

export const POST = errorHandler(async (req) => {
  await authentication(req);
  return new SuccessResponse({
    message: 'Logout success',
    metadata: await logout(req.keyStore),
  }).send(NextResponse);
});
