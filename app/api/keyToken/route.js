import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
  const keyTokens = await prisma.keyToken.findMany(); // Lấy tất cả keyTokens
  return NextResponse.json(keyTokens);
};
