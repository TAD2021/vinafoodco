import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
    const { slug } = params;

    try {
        const product = await prisma.product.findUnique({
            where: { slug: slug },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                images: {
                    select: {
                        url: true,
                    },
                },
                attributes: {
                    select: {
                        attributeName: true,
                        attributeValue: true,
                        sortOrder: true,
                        displayType: true,
                    },
                },
                tags: { // Thêm phần tags vào truy vấn
                    select: {
                        name: true, // Chỉ lấy tên thẻ
                    },
                },
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Chỉ trả về các trường cần thiết
        const response = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images.map(image => image.url), // Lấy tất cả URL hình ảnh
            attributes: product.attributes,
            tags: product.tags.map(tag => tag.name), // Lấy tất cả tên thẻ
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(error); // Ghi log lỗi để dễ dàng debug
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}