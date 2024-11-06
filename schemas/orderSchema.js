import { z } from 'zod';

// Định nghĩa schema cho cart item
export const cartItemSchema = z.object({
  id: z.number().int().positive(), // id phải là số nguyên dương
  name: z.string().min(1, 'Name is required'), // name không được rỗng
  price: z.number().positive(), // price phải là số dương
  quantity: z.number().int().positive(), // quantity phải là số nguyên dương
});

// Định nghĩa schema cho customer info
export const customerInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'), // name không được rỗng
  email: z.string().email('Invalid email format'), // email phải là định dạng email hợp lệ
  phone: z.string().min(10, 'Phone number must be at least 10 characters'), // phone số điện thoại
  address: z.string().min(1, 'Address is required'), // address không được rỗng
  province: z.string().min(1, 'Province is required'), // province không được rỗng
  district: z.string().min(1, 'District is required'), // district không được rỗng
  ward: z.string().min(1, 'Ward is required'), // ward không được rỗng
  note: z.string().optional(), // note là tùy chọn
});

// Định nghĩa schema cho toàn bộ dữ liệu
export const orderSchema = z.object({
  customerInfo: customerInfoSchema,
  paymentMethod: z.enum(['BANK_TRANSFER', 'CREDIT_CARD', 'CASH']), // Giả sử các phương thức thanh toán
  cartItems: z.array(cartItemSchema), // cartItems là mảng các cart item
});

// Hàm để xác thực dữ liệu
export const validateOrderData = (data) => {
  try {
    orderSchema.parse(data); // Kiểm tra dữ liệu
    return { valid: true }; // Nếu hợp lệ
  } catch (error) {
    return { valid: false, errors: error.errors }; // Nếu không hợp lệ
  }
};
