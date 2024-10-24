import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { userId, products, totalPrice } = req.body;

        // Kiểm tra giá sản phẩm
        const checkedPrices = await checkProductPrices(products);
        if (!checkedPrices) {
            return NextResponse.json({ error: 'Giá sản phẩm không chính xác' }, { status: 400 });
        }

        // Tạo order
        const order = await prisma.order.create({
        data: {
            userId,
            totalPrice,
            orderItems: {
            create: products.map((product) => ({
                productId: product.id,
                quantity: product.quantity,
                price: product.price,
            })),
            },
        },
        });

        return NextResponse.json({order}, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}

async function checkProductPrices(products) {
    const productPrices = await prisma.product.findMany({
        where: {
            id: {
                in: products.map((product) => product.id),
            },
        },
        select: {
            id: true,
            price: true,
        },
    });

    for (const product of products) {
        const productPrice = productPrices.find((price) => price.id === product.id);
        if (!productPrice || productPrice.price !== product.price) {
            return false;
        }
    }

    return true;
}