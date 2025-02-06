import { BadRequestError, NotFoundError } from '@/core/error.response';
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

    if (!product || product.stock < item.quantity)
      throw new BadRequestError(
        `Some products have been updated, please return to the cart`
      );

    return prismaClient.product.update({
      where: { id: item.id },
      data: { stock: { decrement: item.quantity } },
    });
  });

  return await Promise.all(updatePromises);
};

const getFormattedProducts = (products) => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    slug: product.slug,
    updatedAt: product.updatedAt,
    stock: product.stock,
    image: product.images.length > 0 ? product.images[0].url : null,
  }));
};

const commonSelect = {
  id: true,
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
    where: {
      isDeleted: false,
    },
    select: {
      ...commonSelect,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const productsByCategory = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    const productData = getFormattedProducts([product])[0];

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
    where: {
      isDeleted: false,
    },
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    select: commonSelect,
  });

  const totalProducts = await prisma.product.count({
    where: {
      isDeleted: false,
    },
  });

  return {
    products: getFormattedProducts(products),
    totalProducts,
    totalPages: Math.ceil(totalProducts / pageSize),
    currentPage: pageNum,
  };
};

const generateUniqueSlug = async (slug) => {
  let uniqueSlug = slug;
  let count = 1;
  while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  return uniqueSlug;
};

export const createProduct = async ({
  name,
  description,
  price,
  stock,
  slug,
  categoryId,
  userId,
  tags,
  images,
  attributes,
}) => {
  const uniqueSlug = await generateUniqueSlug(slug);

  return await prisma.product.create({
    data: {
      name,
      slug: uniqueSlug,
      userId,
      description,
      price,
      stock,
      categoryId: parseInt(categoryId),
      images: {
        create: images.map((url) => ({ url })),
      },
      attributes: {
        create: attributes.flatMap((attr) => {
          if (attr.displayType === 'LIST') {
            return attr.attributeValues.map((value) => ({
              attributeName: attr.attributeName,
              attributeValue: value,
              displayType: attr.displayType,
            }));
          } else {
            return {
              attributeName: attr.attributeName,
              attributeValue: attr.attributeValues[0],
              displayType: attr.displayType,
            };
          }
        }),
      },
      tags: {
        connect: tags.map((tagId) => ({ id: tagId })),
      },
    },
  });
};

export const updateProduct = async (
  slug,
  {
    name,
    description,
    price,
    stock,
    categoryId,
    userId,
    tags,
    images,
    attributes,
  }
) => {
  const existingProduct = await prisma.product.findUnique({
    where: { slug: slug },
  });

  if (!existingProduct) {
    throw new NotFoundError('Product not found');
  }

  return await prisma.product.update({
    where: { slug: slug },
    data: {
      name,
      description,
      price,
      slug,
      userId,
      categoryId,
      stock,
      attributes: {
        deleteMany: {},
        create: attributes
          ? attributes.flatMap((attr) => {
              if (attr.displayType === 'LIST') {
                return attr.attributeValues.map((value) => ({
                  attributeName: attr.attributeName,
                  attributeValue: value,
                  displayType: attr.displayType,
                }));
              } else {
                return {
                  attributeName: attr.attributeName,
                  attributeValue: attr.attributeValues[0],
                  displayType: attr.displayType,
                };
              }
            })
          : [],
      },
      tags: {
        set: tags.map((tagId) => ({ id: tagId })),
      },
      images: {
        deleteMany: {},
        create: images ? images.map((url) => ({ url })) : [],
      },
    },
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.update({
    where: { id: Number(id) },
    data: { isDeleted: true },
  });
};

export const getSimilarProduct = async (slug) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      tags: true,
    },
  });

  if (!product) {
    throw new NotFoundError('Sản phẩm không tồn tại');
  }

  const tagIds = product.tags.map((tag) => tag.id);
  return await prisma.product.findMany({
    where: {
      tags: {
        some: {
          id: { in: tagIds },
        },
      },
      id: { not: product.id },
    },
    include: {
      images: true,
      tags: true,
    },
  });
};

export const getProductsByCategory = async (slug) => {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!category) {
    throw new NotFoundError('Danh mục không tồn tại');
  }

  return {
    categoryName: category.name,
    products: category.products,
  };
};
