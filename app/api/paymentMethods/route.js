import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { getPayments } from '@/services/paymentService';

export const GET = errorHandler(async () => {
  return new SuccessResponse({
    message: 'Get payment methods success',
    metadata: await getPayments(),
  }).send(NextResponse);
});
