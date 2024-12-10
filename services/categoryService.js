export const getCategories = async () => {
  return await prisma.category.findMany();
};

export const deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: { id: parseInt(id) },
  });
};

export const createCategory = async ({ name, slug, description }) => {
  return await prisma.category.create({
    data: {
      name,
      slug,
      description,
    },
  });
};
