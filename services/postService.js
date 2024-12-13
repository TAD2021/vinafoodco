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
