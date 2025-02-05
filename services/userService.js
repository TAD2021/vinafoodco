import bcrypt from 'bcryptjs';
import {
  AuthFailureError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '@/core/error.response';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '@/utils/email';

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

export const forgotPassword = async ({ email }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new NotFoundError('Admin not found');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 giờ

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpiry,
    },
  });

  await sendResetPasswordEmail(email, resetToken);
  return {};
};

export const resetPassword = async ({ token, newPassword }) => {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new BadRequestError('Invalid or expired token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async ({ name, email }) => {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });

  if (foundUser) {
    throw new BadRequestError('Email đã được sử dụng');
  }

  const hashedPassword = await bcrypt.hash(process.env.INITIAL_PASS, 10);

  return await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: { isDeleted: true },
  });
};
