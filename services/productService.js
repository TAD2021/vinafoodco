import { metadata } from '@/app/(root)/layout';
import { BadRequestError } from '@/core/error.response';
import prisma from '@/lib/prisma';

export const getProductById = async (productId, prismaClient = prisma) => {
  return await prismaClient.product.findUnique({ where: { id: productId } });
};

export const getProductByServer = async (products, prismaClient = prisma) => {
  const foundProducts = await Promise.all(
    products.map(async (product) => {
      const foundProduct = await getProductById(product.id, prismaClient);

      if (foundProduct) {
        return {
          price: foundProduct.price,
          quantity: product.quantity,
          id: product.id,
        };
      }
      return null;
    })
  );

  return foundProducts.filter((product) => product !== null);
};

export const updateProductStock = async (cartItems, prismaClient = prisma) => {
  const updatePromises = cartItems.map(async (item) => {
    const product = await getProductById(item.id, prismaClient);

    // Kiểm tra xem số lượng tồn kho có đủ không
    if (!product || product.stock < item.quantity)
      throw new BadRequestError(
        `Some products have been updated, please return to the cart`
      );

    // Nếu tồn kho đủ, thực hiện cập nhật
    return prismaClient.product.update({
      where: { id: item.id },
      data: { stock: { decrement: item.quantity } },
    });
  });

  return await Promise.all(updatePromises);
};

const getFormattedProducts = (products) => {
  return products.map((product) => ({
    name: product.name,
    price: product.price,
    slug: product.slug,
    updatedAt: product.updatedAt,
    stock: product.stock,
    image: product.images.length > 0 ? product.images[0].url : null,
  }));
};

// Common product selection fields
const commonSelect = {
  name: true,
  price: true,
  slug: true,
  updatedAt: true,
  stock: true,
  images: {
    take: 1,
    select: {
      url: true,
    },
  },
};

export const getProductByCategory = async () => {
  const products = await prisma.product.findMany({
    select: {
      ...commonSelect,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  // Organize products by category
  const productsByCategory = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    const productData = getFormattedProducts([product])[0]; // Reuse formatting function

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(productData);
    return acc;
  }, {});

  return productsByCategory;
};

export const getProductByPages = async (pageNum, pageSize) => {
  const products = await prisma.product.findMany({
    skip: (pageNum - 1) * pageSize, // Bỏ qua số lượng sản phẩm đã có
    take: pageSize, // Lấy số lượng sản phẩm theo limit
    select: commonSelect,
  });

  const totalProducts = await prisma.product.count();

  return {
    products: getFormattedProducts(products),
    totalProducts,
    totalPages: Math.ceil(totalProducts / pageSize),
    currentPage: pageNum,
  };
};
