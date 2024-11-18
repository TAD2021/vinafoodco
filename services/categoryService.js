export const getCategories = async () => {
  return await prisma.category.findMany();
};
