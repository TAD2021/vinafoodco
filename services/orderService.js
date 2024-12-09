import prisma from '@/lib/prisma';
import { findOrCreateCustomer } from './customerService';
import { updateProductStock, getProductByServer } from './productService';
import { NotFoundError } from '@/core/error.response';
import { createPayment } from './paymentService';

export const createOrder = async ({
  customerInfo,
  paymentMethod,
  cartItems,
}) => {
  return await prisma.$transaction(async (prisma) => {
    const customer = await findOrCreateCustomer(customerInfo, prisma);
    const products = await getProductByServer(cartItems, prisma);

    if (!products.length)
      throw new NotFoundError('No valid products found for the order.');

    const totalPrice = products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );

    // Prepare order data
    const orderData = {
      customerId: customer.id,
      totalPrice,
      status: 'PENDING',
      recipient: customerInfo.name,
      phoneNumber: customerInfo.phone,
      street: customerInfo.address,
      ward: customerInfo.ward,
      district: customerInfo.district,
      province: customerInfo.province,
      note: customerInfo.note,
    };

    // Create the order
    const order = await prisma.order.create({ data: orderData });

    // Create order items
    const orderItemsPromises = products.map((item) =>
      prisma.orderItem.create({
        data: {
          quantity: item.quantity,
          productId: item.id,
          orderId: order.id,
          price: item.price,
        },
      })
    );

    await Promise.all(orderItemsPromises);

    // Update product stock
    await updateProductStock(products, prisma);

    const payment = await createPayment(
      order.id,
      totalPrice,
      paymentMethod,
      customer.id,
      prisma
    );

    return { order, payment };
  });
};

export const getOrders = async (page, pageSize) => {
  // Tính toán offset cho phân trang
  const offset = (page - 1) * pageSize;

  // Fetch orders với phân trang và chỉ lấy các trường cần thiết
  const orders = await prisma.order.findMany({
    skip: offset,
    take: pageSize,
    where: {
      isDeleted: false,
    },
    select: {
      id: true, // Mã đơn hàng
      totalPrice: true, // Tổng giá trị đơn hàng
      status: true, // Trạng thái đơn hàng
      createdAt: true, // Ngày tạo đơn hàng
      recipient: true, // Tên người nhận
      phoneNumber: true, // Số điện thoại
      orderItems: {
        select: {
          id: true, // Mã sản phẩm trong đơn hàng
          quantity: true, // Số lượng sản phẩm
          price: true, // Giá sản phẩm
          product: {
            select: {
              id: true, // Mã sản phẩm
              name: true, // Tên sản phẩm
              price: true, // Giá sản phẩm
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // Sắp xếp theo ngày tạo, giảm dần
    },
  });

  // Lấy tổng số đơn hàng để phân trang
  const totalOrders = await prisma.order.count();

  // Tính toán tổng số trang
  const totalPages = Math.ceil(totalOrders / pageSize);

  return {
    orders,
    totalPages,
    currentPage: Number(page),
  };
};

export const updateStatus = async (id, status) => {
  return await prisma.order.update({
    where: { id: parseInt(id) },
    data: { status },
  });
};

export const getOrder = async (id) => {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) }, // Chuyển đổi ID thành số nguyên
    include: {
      customer: true, // Thông tin khách hàng
      orderItems: {
        include: {
          product: true, // Thông tin sản phẩm trong đơn hàng
        },
      },
      payments: {
        include: {
          method: true, // Thông tin phương thức thanh toán
        },
      },
    },
  });

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  // Tạo cấu trúc dữ liệu để trả về
  const orderDetails = {
    id: order.id,
    recipient: order.recipient,
    phoneNumber: order.phoneNumber,
    street: order.street,
    ward: order.ward,
    district: order.district,
    province: order.province,
    status: order.status,
    totalPrice: order.totalPrice,
    items: order.orderItems.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.price,
    })),
    paymentStatus: order.payments.length > 0 ? order.payments[0].status : null,
    paymentMethod:
      order.payments.length > 0 ? order.payments[0].method.name : null,
  };

  return orderDetails;
};

export const deleteOrder = async (id) => {
  return await prisma.order.update({
    where: { id: Number(id) },
    data: { isDeleted: true },
  });
};
