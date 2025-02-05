import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { createUser, getUsers } from '@/services/userService';

export const GET = errorHandler(async () => {
  return new SuccessResponse({
    message: 'Get users success',
    metadata: await getUsers(),
  }).send(NextResponse);
});

export const POST = errorHandler(async (req) => {
  const requestBody = await req.json();
  return new SuccessResponse({
    message: 'Create user success',
    metadata: await createUser(requestBody),
  }).send(NextResponse);
});
