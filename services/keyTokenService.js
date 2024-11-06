export const createKeyToken = async ({
  userId,
  publicKey,
  privateKey,
  refreshToken,
}) => {
  try {
    // Kiểm tra xem keyToken đã tồn tại chưa
    const existingToken = await prisma.keyToken.findFirst({
      where: { userId }, // Tìm kiếm theo userId
    });
    if (existingToken) {
      // Nếu tồn tại, cập nhật
      const updatedToken = await prisma.keyToken.update({
        where: { id: existingToken.id }, // Sử dụng id của bản ghi đã tồn tại
        data: {
          publicKey,
          privateKey,
          refreshToken,
        },
      });
      return updatedToken.publicKey; // Trả về publicKey đã cập nhật
    } else {
      // Nếu không tồn tại, tạo mới
      const newToken = await prisma.keyToken.create({
        data: {
          userId,
          publicKey,
          privateKey,
          refreshToken,
        },
      });
      return newToken.publicKey; // Trả về publicKey của bản ghi mới
    }
  } catch (error) {
    return error;
  }
};

export const removeKeyById = async (id) => {
  return await prisma.keyToken.delete({
    where: { id },
  });
};

export const findByRefreshToken = async (refreshToken) => {
  const tokens = await prisma.keyToken.findMany({
    where: { refreshToken },
  });
  return tokens.length > 0 ? tokens[0] : null;
};

export const findByUserId = async (userId) => {
  const tokens = await prisma.keyToken.findMany({
    where: { userId },
  });
  return tokens.length > 0 ? tokens[0] : null;
};
