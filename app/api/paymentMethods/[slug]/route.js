import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { updatePayment } from '@/services/paymentService';

export const PUT = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];
  const reqBody = req.json();

  return new SuccessResponse({
    message: 'Update payment method success',
    metadata: await updatePayment(id, reqBody),
  }).send(NextResponse);
});
