import { z } from 'zod';

// Định nghĩa schema cho cart item
export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Hàm để xác thực dữ liệu
export const validateOrderData = (data) => {
  try {
    signUpSchema.parse(data); // Kiểm tra dữ liệu
    return { valid: true }; // Nếu hợp lệ
  } catch (error) {
    return { valid: false, errors: error.errors }; // Nếu không hợp lệ
  }
};
