import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { BadRequestError } from '@/core/error.response';
import { deleteOrder, getOrder, updateStatus } from '@/services/orderService';

export const PUT = errorHandler(async (req) => {
  const { status } = await req.json();
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];

  console.log(status);
  // Validate the status
  if (
    !status ||
    !['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED'].includes(status)
  ) {
    throw new BadRequestError('Invalid status');
  }

  return new SuccessResponse({
    message: 'Update status success',
    metadata: await updateStatus(id, status),
  }).send(NextResponse);
});

export const GET = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];
  return new SuccessResponse({
    message: 'Get order success',
    metadata: await getOrder(id),
  }).send(NextResponse);
});

export const DELETE = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];

  return new SuccessResponse({
    message: 'Get order success',
    metadata: await deleteOrder(id),
  }).send(NextResponse);
});
