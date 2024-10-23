import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { content, name, slug, rating } = await req.json(); // Lấy dữ liệu từ body

    try {
        // Tìm sản phẩm dựa trên slug
        const product = await prisma.product.findUnique({
            where: { slug: slug },
        });

        if (!product) {
            return NextResponse.json({ error: 'Sản phẩm không tồn tại.' }, { status: 404 });
        }

        // Tạo bình luận mới với các trường mới
        const comment = await prisma.comment.create({
            data: {
                content,
                name,
                productId: product.id, // Sử dụng productId từ sản phẩm tìm thấy
                rating, // Nếu có rating, thêm vào
            },
        });

        // Trả về phản hồi JSON với comment và productId
        return NextResponse.json({ 
            comment, 
            productId: product.id 
        }, { status: 201 }); // Trả về phản hồi JSON với mã trạng thái 201
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi tạo bình luận' }, { status: 500 }); // Trả về phản hồi JSON với mã trạng thái 500
    } finally {
        await prisma.$disconnect();
    }
}