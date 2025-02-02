import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { updatePaymentMethod } from '@/services/paymentService';

export const PUT = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts[3];
  const { description } = await req.json();

  const updatedPaymentMethod = updatePaymentMethod(id, description);

  // Trả về phản hồi thành công
  return new SuccessResponse({
    message: 'Payment method description updated successfully',
    metadata: updatedPaymentMethod,
  }).send(NextResponse);
});
