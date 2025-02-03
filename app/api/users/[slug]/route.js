import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { changePassword, updateInfo } from '@/services/userService';
import prisma from '@/lib/prisma';

export const POST = errorHandler(async (req) => {
  const requestBody = await req.json();
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];

  const { email, name } = requestBody;
  let data;

  if (email && name) {
    data = await updateInfo(id, requestBody);
  } else {
    data = await changePassword(id, requestBody);
  }

  return new SuccessResponse({
    message: 'Get tags success',
    metadata: data,
  }).send(NextResponse);
});
