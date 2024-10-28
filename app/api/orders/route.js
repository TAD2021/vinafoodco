import { NextResponse } from 'next/server';
import { createOrder } from '@/services/orderService';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { orderSchema } from '@/schemas/orderSchema';
import { BadRequestError } from '@/core/error.response';

export const POST = errorHandler(async (req) => {
  const requestBody = await req.json();

  const result = orderSchema.safeParse(requestBody);
  if (!result.success) throw new BadRequestError(result.error.errors.map(err => err.message))

  const orderData = result.data;

  return new SuccessResponse({
    message: 'Create a new Cart',
    metadata: await createOrder(orderData)
  }).send(NextResponse);
});