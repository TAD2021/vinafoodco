'use client'

import { useState } from 'react';
import CartItems from "@/components/orders/CartItems";
import CustomerInfo from "@/components/orders/CustomerInfo";
import OrderInfo from "@/components/orders/OrderInfo";

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

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartItems, setCartItems] = useState([]); // State to hold cart items

  const handleOrderSubmit = () => {
    const orderData = {
      customerInfo,
      paymentMethod,
      cartItems,
    };

    // Gửi orderData đến API hoặc xử lý theo nhu cầu
    console.log('Order Data:', orderData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-between">
        <CustomerInfo setCustomerInfo={setCustomerInfo} />
        <OrderInfo setPaymentMethod={setPaymentMethod} />
        <CartItems setCartItems={setCartItems} onOrderSubmit={handleOrderSubmit} />
      </div>
    </div>
  );
}