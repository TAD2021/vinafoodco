import { BadRequestError } from '@/core/error.response';
import { CREATED, SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { signUpSchema } from '@/schemas/accessSchema';
import { signUp } from '@/services/accessService';
import { NextResponse } from 'next/server';

export const POST = errorHandler(async (req) => {
  const requestBody = await req.json();
  const result = signUpSchema.safeParse(requestBody);
  if (!result.success)
    throw new BadRequestError(result.error.errors.map((err) => err.message));

  const userData = result.data;
  const { metadata } = await signUp(userData);

  if (metadata) {
    // Nếu có metadata, trả về CREATED
    return new CREATED({
      message: 'Create a new user successfully',
      metadata,
    }).send(NextResponse);
  } else {
    return new SuccessResponse({
      message: 'User creation process completed, but no user was created.',
      metadata: null,
    }).send(NextResponse);
  }
});
