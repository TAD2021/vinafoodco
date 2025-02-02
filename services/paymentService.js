import { BadRequestError, NotFoundError } from '@/core/error.response';
import prisma from '@/lib/prisma';

export const checkPaymentMethod = async (paymentMethod) => {
  return await prisma.paymentMethod.findUnique({
    where: { code: paymentMethod },
  });
};
export const createPayment = async (
  orderId,
  totalPrice,
  paymentMethod,
  customerId,
  prismaClient = prisma
) => {
  const paymentMethodRecord = await checkPaymentMethod(paymentMethod);
  if (!paymentMethodRecord)
    throw new NotFoundError(`paymentMethod ${paymentMethod} not found`);

  const payment = await prismaClient.payment.create({
    data: {
      orderId: orderId,
      amount: totalPrice,
      methodId: paymentMethodRecord.id,
      status: 'PENDING',
      customerId: customerId,
    },
  });

  return payment;
};

export const updatePaymentMethod = async (id, description) => {
  if (!id) {
    throw new BadRequestError('Payment method ID is required');
  }

  if (!description) {
    throw new BadRequestError('Description is required');
  }

  return await prisma.paymentMethod.update({
    where: { id: parseInt(id) }, // Chuyển đổi id sang số nguyên
    data: { description }, // Cập nhật trường description
  });
};
