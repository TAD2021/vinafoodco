import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  try {
    const products = await prisma.product.findMany({
      select: {
        name: true, // Chỉ lấy tên sản phẩm
        price: true, // Chỉ lấy giá sản phẩm
        slug: true, // Thêm slug vào truy vấn
        images: {
          take: 1, // Lấy 1 hình ảnh cho mỗi sản phẩm
          select: {
            url: true, // Chỉ lấy URL của hình ảnh
          },
        },
        category: {
          select: {
            name: true, // Lấy tên danh mục
          },
        },
      },
    });

    // Tổ chức sản phẩm theo danh mục
    const productsByCategory = products.reduce((acc, product) => {
      const categoryName = product.category.name; // Lấy tên danh mục
      const productData = {
        name: product.name,
        price: product.price,
        slug: product.slug, // Thêm slug vào dữ liệu sản phẩm
        image: product.images.length > 0 ? product.images[0].url : null, // Lấy URL hình ảnh hoặc null nếu không có
      };

      if (!acc[categoryName]) {
        acc[categoryName] = []; // Khởi tạo mảng nếu chưa có
      }
      acc[categoryName].push(productData); // Thêm sản phẩm vào danh mục
      return acc;
    }, {});

    return NextResponse.json(productsByCategory); // Trả về phản hồi JSON
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}