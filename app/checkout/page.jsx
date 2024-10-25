// Checkout.js
'use client'

import { useEffect, useState } from 'react';
import CartItems from "@/components/orders/CartItems";
import CustomerInfo from "@/components/orders/CustomerInfo";
import OrderInfo from "@/components/orders/OrderInfo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Checkout() {
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

        console.log(data.paymentMethods);
        
        // Nếu có phương thức thanh toán, đặt phương thức đầu tiên làm mặc định
        if (data.paymentMethods.length > 0) {
          setPaymentMethod(data.paymentMethods[0].code); // Đặt phương thức đầu tiên làm mặc định
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleOrderSubmit = () => {
    // Kiểm tra thông tin người dùng
    const { name, email, phone, address, province, district, ward } = customerInfo;
    console.log(customerInfo)

    if (!name || !email || !phone || !address || !province || !district || !ward) {
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

    // Gửi orderData đến API hoặc xử lý theo nhu cầu
    console.log('Order Data:', orderData);
    toast.success('Đặt hàng thành công!');
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row justify-between">
        <CustomerInfo setCustomerInfo={setCustomerInfo} />
        <OrderInfo paymentMethod={paymentMethod} paymentMethods={paymentMethods} setPaymentMethod={setPaymentMethod} />
        <CartItems setCartItems={setCartItems} onOrderSubmit={handleOrderSubmit} />
      </div>
    </div>
  );
}