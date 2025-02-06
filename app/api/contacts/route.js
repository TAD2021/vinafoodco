import { NextResponse } from 'next/server';
import { SuccessResponse } from '@/core/success.response';
import { errorHandler } from '@/middleware/errorHandler';
import { createContact, getContacts } from '@/services/contactService';

export const POST = errorHandler(async (req) => {
  const reqBody = await req.json();
  return new SuccessResponse({
    message: 'Gửi thông tin liên hệ thành công!',
    metadata: await createContact(reqBody),
  }).send(NextResponse);
});

export const GET = errorHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1; // Trang hiện tại, mặc định là 1
  const limit = 10; // Số lượng contact mỗi trang

  return new SuccessResponse({
    message: 'Get contact list success',
    metadata: await getContacts(page, limit),
  }).send(NextResponse);
});
