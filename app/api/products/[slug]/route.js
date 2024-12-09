import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteProduct, updateProduct } from '@/services/productService';
import { errorHandler } from '@/middleware/errorHandler';
import { SuccessResponse } from '@/core/success.response';
import { NotFoundError } from '@/core/error.response';

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
        stock: true,
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
        tags: {
          // Thêm phần tags vào truy vấn
          select: {
            id: true,
            name: true, // Chỉ lấy tên thẻ
          },
        },
        category: {
          // Thêm phần category vào truy vấn
          select: {
            id: true, // Lấy ID của danh mục
            name: true, // Lấy tên của danh mục
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
      stock: product.stock,
      images: product.images.map((image) => image.url), // Lấy tất cả URL hình ảnh
      attributes: product.attributes,
      tags: product.tags, // Lấy tất cả tên thẻ
      category: product.category,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error); // Ghi log lỗi để dễ dàng debug
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const PATCH = errorHandler(async (req) => {
  const requestBody = await req.json();
  const pathParts = req.nextUrl.pathname.split('/');
  const slug = pathParts[3];

  return new SuccessResponse({
    message: 'Create a product success',
    metadata: updateProduct(slug, requestBody),
  }).send(NextResponse);
});

export const DELETE = errorHandler(async (req) => {
  const pathParts = req.nextUrl.pathname.split('/');
  const slug = pathParts[3];
  const deletedProduct = await deleteProduct(slug);

  if (!deletedProduct) throw new NotFoundError('Product not found');

  return new SuccessResponse({
    message: 'Product deleted successfully',
    metadata: deletedProduct,
  }).send(NextResponse);
});
