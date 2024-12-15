import { BadRequestError } from '@/core/error.response';

export const getPosts = async () => {
  return prisma.post.findMany({
    take: 3, // Lấy 3 tin tức mới nhất
    orderBy: { createdAt: 'desc' }, // Sắp xếp theo thời gian tạo mới nhất
    select: {
      // Chọn các trường cần lấy
      id: true,
      title: true,
      content: true,
      thumbnail: true,
      slug: true,
      type: true,
      createdAt: true,
    },
  });
};

export const getPost = async (slug) => {
  return await prisma.post.findUnique({
    where: { slug: slug },
  });
};

export const createPost = async ({
  title,
  description,
  content,
  thumbnail,
  slug,
  type,
}) => {
  // Kiểm tra dữ liệu đầu vào
  if (!title || !description || !content || !thumbnail || !slug || !type) {
    throw new BadRequestError('Missing required fields');
  }

  // Kiểm tra xem slug đã tồn tại hay chưa
  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (existingPost) {
    throw new BadRequestError('Slug must be unique');
  }

  return await prisma.post.create({
    data: {
      title,
      description,
      content,
      thumbnail,
      slug,
      type,
    },
  });
};

export const updatePost = async (
  id,
  { title, description, content, thumbnail, slug, type }
) => {
  // Fetch the existing post
  const existingPost = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!existingPost) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Update the post, keeping the old thumbnail if no new one is provided
  return await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      content,
      thumbnail: thumbnail || existingPost.thumbnail, // Use old thumbnail if not updated
      slug,
      type,
    },
  });
};

export const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id: Number(id) },
  });
};
