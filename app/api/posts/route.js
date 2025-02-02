import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      take: 3, // Lấy 3 tin tức mới nhất
      orderBy: { createdAt: 'desc' }, // Sắp xếp theo thời gian tạo mới nhất
      select: {
        // Chọn các trường cần lấy
        id: true,
        title: true,
        content: true,
        thumbnail: true,
        slug: true,
        type: true,
        createdAt: true,
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
