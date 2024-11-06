import { BadRequestError } from '@/core/error.response';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { loginSchema } from '@/schemas/accessSchema';
import { login } from '@/services/accessService';
import { NextResponse } from 'next/server';

export const POST = errorHandler(async (req) => {
  const requestBody = await req.json();
  const result = loginSchema.safeParse(requestBody);
  if (!result.success) {
    throw new BadRequestError(result.error.errors.map((err) => err.message));
  }

  const userData = result.data;
  return new SuccessResponse({
    message: 'Login success',
    metadata: await login(userData),
  }).send(NextResponse);
});
