import prisma from '@/lib/prisma';

export const getRating = async (postId, productId) => {
  const comments = await prisma.comment.findMany({
    where: {
      rating: { not: null },
      OR: [
        { postId: postId ? parseInt(postId) : undefined },
        { productId: productId ? parseInt(productId) : undefined },
      ],
    },
    select: { rating: true },
  });

  // Tính toán trung bình
  const totalRatings = comments.reduce(
    (sum, comment) => sum + (comment.rating || 0),
    0
  );
  const averageRating =
    comments.length > 0 ? totalRatings / comments.length : 0;

  // Làm tròn đến 1 chữ số thập phân
  const roundedAverage = Math.round(averageRating * 10) / 10;
  return {
    averageRating: roundedAverage,
  };
};
