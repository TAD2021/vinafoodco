'use client';

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '@/redux/cartSlice'; // Import actions

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(cart)

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  return (
    <Fragment>
      <main className="container mx-auto my-8">
        <h1 className="text-center text-2xl font-bold mb-4">Giỏ hàng</h1>
        
        {cart.items.length === 0 ? (
          <div className="border-dashed border-2 border-red-600 p-4 text-center">
            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
          </div>
        ) : (
          cart.items.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow rounded-lg mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <Image
                    alt={item.name}
                    className="h-24"
                    height="100"
                    src={item.image}
                    width="100"
                  />
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <a 
                      className="text-red-500 cursor-pointer" 
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Xóa
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg">{item.price}đ</p>
                  <div className="flex items-center border rounded">
                    <button className="px-2" onClick={() => handleDecrement(item.id)}>-</button>
                    <input
                      className="w-8 text-center border-l border-r"
                      type="text"
                      value={item.quantity }
                      readOnly
                    />
                    <button className="px-2" onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="text-center mt-4">
          <Link
            className="flex items-center text-green-600 hover:underline"
            href="/products" // Redirect to products page
          >
            <GrFormPreviousLink className="mr-2" />
            Tiếp tục mua hàng
          </Link>
        </div>

        {cart.items.length > 0 && (
          <div className="bg-white p-4 shadow rounded-lg mt-4 flex justify-between">
            <div className="w-1/2">
              <p className="text-lg">Tạm tính:</p>
              <p className="text-lg">Thành tiền:</p>
            </div>
            <div className="w-1/2 text-right">
              <p className="text-lg">{cart.total}đ</p>
              <p className="text-lg font-bold">{cart.total}đ</p>
            </div>
          </div>
        )}

        {cart.items.length > 0 && (
          <div className="bg-white p-4 shadow rounded-lg mt-4">
            <Link href={'/checkout'}>
              <button className="bg-green-700 text-white px-4 py-2 rounded mt-4 w-full">
                Tiến hành đặt hàng
                <i className="fas fa-arrow-right"></i>
              </button>
            </Link>
          </div>
        )}
      </main>
    </Fragment>
  );
}