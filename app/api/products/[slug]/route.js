import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteProduct } from '@/services/productService';
import { errorHandler } from '@/middleware/errorHandler';
import { SuccessResponse } from '@/core/success.response';
import { BadRequestError, NotFoundError } from '@/core/error.response';

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
        tags: {
          // Thêm phần tags vào truy vấn
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
      images: product.images.map((image) => image.url), // Lấy tất cả URL hình ảnh
      attributes: product.attributes,
      tags: product.tags.map((tag) => tag.name), // Lấy tất cả tên thẻ
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
