import { useSelector } from 'react-redux';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect } from 'react';

export default function CartItems({ setCartItems, onOrderSubmit }) {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  // Cập nhật cart items mỗi khi items thay đổi
  useEffect(() => {
    setCartItems(items);
  }, [items, setCartItems]);

  return (
    <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Đơn Hàng Của Bạn</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <Image
              alt={item.name}
              className="mr-4"
              src={item.image}
              width={50}
              height={50}
            />
            <div className="flex-1">
              <p>{item.name}</p>
              <p className="text-sm text-gray-600">{formatCurrency(item.price)} × {item.quantity}</p>
            </div>
            <p>{formatCurrency(item.price * item.quantity)}</p>
          </div>
        ))
      )}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <p>Tạm tính</p>
          <p>{formatCurrency(total)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Thành tiền</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>
      <div className="mt-4">
        <button onClick={onOrderSubmit} className="w-full bg-blue-500 text-white p-2 rounded">
          Đặt mua
        </button>
      </div>
    </div>
  );
}