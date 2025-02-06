import { AuthFailureError, BadRequestError } from '@/core/error.response';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import {
  createKeyToken,
  findByRefreshToken,
  removeKeyById,
} from './keyTokenService';
import { createTokenPair, verifyJWT } from '@/auth/authUtils';

export const signUp = async ({ email, password, name }) => {
  try {
    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existUser) {
      throw new BadRequestError(
        `Email has been used, please try another email!`
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });

    if (newUser) {
      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');

      const keyStore = await createKeyToken({
        userId: newUser.id,
        publicKey,
        privateKey,
      });

      if (!keyStore) throw new BadRequestError('keyStore error');
      const tokens = await createTokenPair(
        { userId: newUser.id, email },
        publicKey,
        privateKey
      );

      return {
        metadata: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          tokens,
        },
      };
    }

    return {
      metadata: null,
    };
  } catch (error) {
    return {
      message: error.message,
      status: 'error',
    };
  }
};

export const login = async ({ email, password, refreshToken = null }) => {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!foundUser) {
    throw new BadRequestError('User not registered');
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    throw new AuthFailureError('Authentication error');
  }

  const privateKey = crypto.randomBytes(64).toString('hex');
  const publicKey = crypto.randomBytes(64).toString('hex');

  const tokens = await createTokenPair(
    { userId: foundUser.id, email },
    publicKey,
    privateKey
  );

  const key = await createKeyToken({
    userId: foundUser.id,
    refreshToken: tokens.refreshToken,
    privateKey,
    publicKey,
  });

  return {
    user: {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    },
    tokens,
  };
};

export const logout = async (keyStore) => {
  const delKey = await removeKeyById(keyStore.id);
  return delKey;
};

export const handlerRefreshToken = async (refreshToken) => {
  const holderToken = await findByRefreshToken(refreshToken);
  if (!holderToken) throw new AuthFailureError('User not registered');

  const { userId, email } = await verifyJWT(
    refreshToken,
    holderToken.privateKey
  );

  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!foundUser) throw new AuthFailureError('User not registered');
  const tokens = await createTokenPair(
    { userId, email },
    holderToken.publicKey,
    holderToken.privateKey
  );

  await prisma.keyToken.update({
    where: { id: holderToken.id },
    data: {
      refreshToken: tokens.refreshToken,
    },
  });

  return {
    user: { userId, email },
    tokens,
  };
};
