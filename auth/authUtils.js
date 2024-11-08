import { AuthFailureError, NotFoundError } from '@/core/error.response';
import { errorHandler } from '@/middleware/errorHandler';
import { findByUserId } from '@/services/keyTokenService';
import JWT from 'jsonwebtoken';

const HEADER = {
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'refreshToken',
};

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '2 days',
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verifying access token`, err);
      } else {
        console.log(`decode verified access token`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (err) {
    console.error('Error creating token pair:', err);
  }
};

export const authentication = async (req) => {
  const userId = parseInt(req.headers.get(HEADER.CLIENT_ID), 10);
  if (!userId) throw new AuthFailureError('Invalid Request');

  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError('Not found keyStore');

  const refreshToken = req.headers.get(HEADER.REFRESHTOKEN);
  if (refreshToken) {
    try {
      const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
      if (userId !== decodeUser.userId) {
        throw new AuthFailureError('Invalid userid');
      }
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      return; // Thoát nếu xác thực thành công
    } catch (err) {
      throw err; // Quăng lỗi nếu không xác thực
    }
  }

  const accessToken = req.headers.get(HEADER.AUTHORIZATION);
  if (!accessToken) throw new AuthFailureError('Invalid Request');

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError('Invalid userid');
    }
    req.user = decodeUser;
    req.keyStore = keyStore;
    return; // Thoát nếu xác thực thành công
  } catch (error) {
    throw error; // Quăng lỗi nếu không xác thực
  }
}

export const verifyJWT = async (token, keySecret) => {
  return JWT.verify(token, keySecret);
};
