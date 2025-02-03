import bcrypt from 'bcryptjs';
import { AuthFailureError, BadRequestError } from '@/core/error.response';
import prisma from '@/lib/prisma';

export const updateInfo = async (id, { name, email }) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, email },
  });
};

export const changePassword = async (id, { currentPassword, newPassword }) => {
  const foundUser = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (!foundUser) {
    throw new BadRequestError('User not registered');
  }

  const match = await bcrypt.compare(currentPassword, foundUser.password);
  if (!match) {
    throw new AuthFailureError('Authentication error');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { password: passwordHash },
  });
};
