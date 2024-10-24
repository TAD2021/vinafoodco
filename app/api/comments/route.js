import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { content, name, slug, rating, type } = await req.json(); // Lấy dữ liệu từ body
    console.log(slug, type)

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
            return NextResponse.json({ error: 'Không tìm thấy đối tượng.' }, { status: 404 });
        }

        // Tạo bình luận mới với các trường mới
        const comment = await prisma.comment.create({
            data: {
                content,
                name,
                [type === 'product' ? 'productId' : 'postId']: item.id, // Sử dụng productId hoặc postId tùy thuộc vào loại
                rating, // Nếu có rating, thêm vào
            },
        });

        // Trả về phản hồi JSON với comment và id của đối tượng
        return NextResponse.json({ 
            comment, 
            itemId: item.id 
        }, { status: 201 }); // Trả về phản hồi JSON với mã trạng thái 201
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi tạo bình luận' }, { status: 500 }); // Trả về phản hồi JSON với mã trạng thái 500
    } finally {
        await prisma.$disconnect();
    }
}