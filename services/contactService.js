import { BadRequestError } from '@/core/error.response';
import prisma from '@/lib/prisma';

export const createContact = async ({ name, email, phoneNumber, message }) => {
  if (!name || !email || !phoneNumber || !message) {
    throw new BadRequestError('Vui lòng nhập đủ thông tin');
  }

  return await prisma.contact.create({
    data: {
      name,
      email,
      phoneNumber,
      message,
    },
  });
};

export const getContacts = async (page, limit) => {
  const offset = (page - 1) * limit;

  // Lấy danh sách contact với phân trang
  const contacts = await prisma.contact.findMany({
    where: { isDeleted: false },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: 'desc', // Sắp xếp theo thời gian tạo mới nhất
    },
  });

  // Lấy tổng số contact để tính tổng số trang
  const totalContacts = await prisma.contact.count();
  const totalPages = Math.ceil(totalContacts / limit);

  return {
    contacts,
    pagination: {
      currentPage: page,
      totalPages,
      totalContacts,
    },
  };
};

export const deleteContact = async (id) => {
  return await prisma.contact.update({
    where: { id: parseInt(id) },
    data: { isDeleted: true },
  });
};
