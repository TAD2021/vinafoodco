import { BadRequestError } from '@/core/error.response';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';

export const signUp = async ({ email, password, name }) => {
  const existUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existUser) {
    throw new BadRequestError(`Email has been used, please try another email!`);
  }

  const passwordHash = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: passwordHash,
    },
  });

  if (newUser) {
    return {
      metadata: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    };
  }

  return {
    metadata: null,
  };
};
