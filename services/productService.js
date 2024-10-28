import { BadRequestError } from "@/core/error.response";
import prisma from "@/lib/prisma";

export const getProductById = async (productId, prismaClient = prisma) => {
  return await prismaClient.product.findUnique({ where: { id: productId } })
}

export const getProductByServer = async (products, prismaClient = prisma) => {
  const foundProducts = await Promise.all(products.map(async product => {
    const foundProduct = await getProductById(product.id, prismaClient);

    if (foundProduct) {
      return {
        price: foundProduct.price,
        quantity: product.quantity,
        id: product.id
      };
    }
    return null; 
  }));

  return foundProducts.filter(product => product !== null);
};

export const updateProductStock = async (cartItems, prismaClient = prisma) => {
  const updatePromises = cartItems.map(async (item) => {
    const product = await getProductById(item.id, prismaClient);

    // Kiểm tra xem số lượng tồn kho có đủ không
    if (!product || product.stock < item.quantity)  throw new BadRequestError(`Some products have been updated, please return to the cart`)

    // Nếu tồn kho đủ, thực hiện cập nhật
    return prismaClient.product.update({
      where: { id: item.id },
      data: { stock: { decrement: item.quantity } },
    });
  });

  return await Promise.all(updatePromises);
};