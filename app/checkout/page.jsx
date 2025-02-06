'use client';

import { useEffect, useState } from 'react';
import CartItems from '@/components/orders/CartItems';
import CustomerInfo from '@/components/orders/CustomerInfo';
import OrderInfo from '@/components/orders/OrderInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/redux/cartSlice';
import axiosInstance from '@/utils/axiosInstance';

export default function Checkout() {
  const dispatch = useDispatch();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: '',
  });

  const [paymentMethod, setPaymentMethod] = useState(''); // Khởi tạo trạng thái paymentMethod rỗng
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('/api/paymentMethods');
        const data = await response.json();
        setPaymentMethods(data.paymentMethods);
        if (data.paymentMethods.length > 0) {
          setPaymentMethod(data.paymentMethods[0].code);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleOrderSubmit = async () => {
    // Kiểm tra thông tin người dùng
    const { name, email, phone, address, province, district, ward } =
      customerInfo;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !province ||
      !district ||
      !ward
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin người dùng!');
      return;
    }

    // Kiểm tra thông tin đơn hàng
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống!');
      return;
    }

    // Kiểm tra thông tin thanh toán
    if (!paymentMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán!');
      return;
    }

    const orderData = {
      customerInfo,
      paymentMethod,
      cartItems,
    };

    try {
      const response = await axiosInstance.post('/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      toast.success('Đặt hàng thành công!');

      // Xóa giỏ hàng sau khi đặt hàng thành công
      dispatch(clearCart());

      // Có thể chuyển hướng đến trang khác hoặc cập nhật trạng thái giỏ hàng
      // router.push('/order-success'); // Nếu bạn sử dụng react-router hoặc next/router
    } catch (error) {
      toast.error(
        error.message || 'Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.'
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row justify-between">
        <CustomerInfo setCustomerInfo={setCustomerInfo} />
        <OrderInfo
          paymentMethod={paymentMethod}
          paymentMethods={paymentMethods}
          setPaymentMethod={setPaymentMethod}
        />
        <CartItems
          setCartItems={setCartItems}
          onOrderSubmit={handleOrderSubmit}
        />
      </div>
    </div>
  );
}
