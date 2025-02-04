import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { forgotPassword } from '@/services/userService';

export const POST = errorHandler(async (req) => {
  const requestBody = await req.json();

  return new SuccessResponse({
    message: 'Reset password email sent',
    metadata: await forgotPassword(requestBody),
  }).send(NextResponse);
});
