import { BadRequestError } from '@/core/error.response';
import prisma from '@/lib/prisma';
import { PostType } from '@prisma/client';
import slugify from 'slugify';

export const getPosts = async ({ page = 1, limit = 5, type }) => {
  const offset = (page - 1) * limit;
  // Tạo điều kiện where nếu type được truyền vào
  const whereCondition = type ? { type } : {};
  whereCondition['isDeleted'] = false;

  return await prisma.post.findMany({
    skip: offset,
    take: parseInt(limit),
    where: whereCondition, // Thêm điều kiện lọc
  });
};

export const getPost = async (slug) => {
  return await prisma.post.findFirst({
    where: { slug, isDeleted: false },
  });
};

const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Kiểm tra xem slug đã tồn tại chưa
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

export const createPost = async ({
  title,
  description,
  content,
  thumbnail,
  type,
}) => {
  if (!Object.values(PostType).includes(type)) {
    throw new BadRequestError('Invalid post type');
  }

  // Tạo slug không trùng
  const slug = await generateUniqueSlug(title);

  return await prisma.post.create({
    data: {
      title,
      slug,
      description,
      content,
      thumbnail,
      type,
    },
  });
};

export const updatePost = async (
  slug,
  { title, description, content, thumbnail, type }
) => {
  if (!title || !content) {
    throw new BadRequestError('Title and content are required');
  }

  return await prisma.post.update({
    where: { slug: slug },
    data: {
      title,
      description,
      content,
      thumbnail,
      type,
    },
  });
};

export const deletePost = async(id) => {
  return await prisma.post.update({
    where: {id: parseInt(id)},
    data: {isDeleted: true}
  })
}