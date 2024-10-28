import prisma from '@/lib/prisma';
import { findOrCreateCustomer } from './customerService';
import { updateProductStock, getProductByServer } from './productService';
import { NotFoundError } from '@/core/error.response';
import { createPayment } from './paymentService';

export const createOrder = async ({ customerInfo, paymentMethod, cartItems }) => {
    return await prisma.$transaction(async (prisma) => {
        const customer = await findOrCreateCustomer(customerInfo, prisma);
        const products = await getProductByServer(cartItems, prisma);
        
        if (!products.length) throw new NotFoundError('No valid products found for the order.');

        const totalPrice = products.reduce((acc, product) => acc + (product.quantity * product.price), 0);

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
        const orderItemsPromises = products.map(item => prisma.orderItem.create({
            data: {
                quantity: item.quantity,
                productId: item.id,
                orderId: order.id,
                price: item.price,
            },
        }));

        await Promise.all(orderItemsPromises);

        // Update product stock
        await updateProductStock(products, prisma);

        const payment = await createPayment(order.id, totalPrice, paymentMethod, customer.id, prisma)

        return { order, payment };
    });
};