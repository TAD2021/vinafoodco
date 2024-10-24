import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    const { slug } = params; // Lấy slug và type từ params
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;

    try {
        let item;

        // Kiểm tra loại và tìm kiếm sản phẩm hoặc bài viết
        if (type === 'product') {
            item = await prisma.product.findUnique({
                where: { slug: slug },
            });
        } else if (type === 'post') {
            item = await prisma.post.findUnique({
                where: { slug: slug },
            });
        }

        if (!item) {
            return NextResponse.json({ error: 'Không tìm thấy đối tượng.', status: 404 });
        }

        // Lấy bình luận dựa trên productId hoặc postId
        const comments = await prisma.comment.findMany({
            where: type === 'product' ? { productId: item.id } : { postId: item.id },
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