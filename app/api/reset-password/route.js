import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { resetPassword } from '@/services/userService';

export const POST = errorHandler(async (req) => {
  const requestBody = await req.json();

  return new SuccessResponse({
    message: 'Password reset successfully',
    metadata: await resetPassword(requestBody),
  }).send(NextResponse);
});
