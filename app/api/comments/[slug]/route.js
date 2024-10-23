import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    const { slug } = params;
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;
    try {
        // Tìm sản phẩm dựa trên slug
        const product = await prisma.product.findUnique({
            where: { slug: slug },
        });

        if (!product) {
            return NextResponse.json({ error: 'Sản phẩm không tồn tại.', status: 404 });
        }

        // Lấy bình luận dựa trên productId
        const comments = await prisma.comment.findMany({
            where: { productId: product.id },
            skip: (page - 1) * limit, // Bỏ qua số bình luận đã lấy
            take: Number(limit), // Lấy số bình luận theo giới hạn
            orderBy: { createdAt: 'desc' }, // Sắp xếp bình luận theo thời gian
        });

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Đã xảy ra lỗi khi lấy bình luận.', status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
