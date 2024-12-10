import prisma from '@/lib/prisma';

export const getTags = async () => {
  return await prisma.tag.findMany();
};

export const deleteTag = async (id) => {
  const tagExists = await prisma.tag.findUnique({
    where: { id: parseInt(id) },
  });

  if (!tagExists) {
    return res.status(404).json({ error: 'Tag not found' });
  }

  const deletedTag = await prisma.tag.delete({
    where: { id: parseInt(id) },
  });

  return deletedTag;
};

export const createTag = async (name) => {
  return await prisma.tag.create({
    data: {
      name,
    },
  });
};
