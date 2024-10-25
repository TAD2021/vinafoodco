// pages/api/orders.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      customerId,
      name,
      email,
      orderItems,
      totalPrice,
      recipient,
      phoneNumber,
      street,
      ward,
      district,
      province,
      note,
      paymentMethodId,
      amount,
    } = req.body;

    try {
      let finalCustomerId = customerId;

      // Nếu customerId không có, tạo khách hàng mới
      if (!finalCustomerId) {
        const newCustomer = await prisma.customer.create({
          data: {
            name,
            email,
            phoneNumber,
          },
        });
        finalCustomerId = newCustomer.id; // Lấy customerId từ bản ghi khách hàng mới
      }

      // Kiểm tra giá và số lượng hàng tồn kho
      for (const item of orderItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        // Kiểm tra xem sản phẩm có tồn tại không
        if (!product) {
          return res.status(404).json({ error: `Sản phẩm với ID ${item.productId} không tồn tại.` });
        }

        // Kiểm tra giá
        if (product.price !== item.price) {
          return res.status(400).json({ error: `Giá sản phẩm không khớp với giá đã cho.` });
        }

        // Kiểm tra số lượng hàng tồn kho
        if (product.stock < item.quantity) {
          return res.status(400).json({ error: `Số lượng hàng tồn kho không đủ cho sản phẩm ${product.name}.` });
        }
      }

      // Tạo đơn hàng
      const order = await prisma.order.create({
        data: {
          customerId: finalCustomerId,
          totalPrice,
          recipient,
          phoneNumber,
          street,
          ward,
          district,
          province,
          note,
          orderItems: {
            create: orderItems.map(item => ({
              quantity: item.quantity,
              productId: item.productId,
              price: item.price,
            })),
          },
          payments: {
            create: {
              amount,
              methodId: paymentMethodId,
              status: 'PENDING',
            },
          },
        },
      });

      // Cập nhật số lượng hàng tồn kho
      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity, // Giảm số lượng hàng tồn kho
            },
          },
        });
      }

      return res.status(201).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo đơn hàng.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}