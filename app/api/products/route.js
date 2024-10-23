import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Get the query parameters from the request URL
  const isNew = searchParams.get('new');

  try {
    let products;
    if (isNew === 'true') {
      products = await prisma.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        select: {
          name: true,
          price: true,
          slug: true,
          images: {
            take: 1, // Chỉ lấy 1 hình ảnh mỗi sản phẩm
            select: {
              url: true,
            },
          },
        },
      });
      // Chuyển đổi cấu trúc dữ liệu để trả về hình ảnh là một trường duy nhất (thay vì mảng)
      const formattedProducts = products.map((product) => ({
        name: product.name,
        price: product.price,
        slug: product.slug,
        image: product.images.length > 0 ? product.images[0].url : null, // Lấy URL của hình ảnh đầu tiên nếu tồn tại
      }));
      return NextResponse.json(formattedProducts); // Trả về phản hồi JSON
    }
    products = await prisma.product.findMany({
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