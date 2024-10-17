import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { GrFormPreviousLink } from "react-icons/gr";

export default function Cart() {
  return (
    <Fragment>
      <main className="container mx-auto my-8">
        <h1 className="text-center text-2xl font-bold mb-4">Giỏ hàng</h1>
        <div className="border-dashed border-2 border-red-600 p-4 text-center">
          <p>Chưa có sản phẩm nào trong giỏ hàng</p>
        </div>
        <div className="text-center mt-4">
          <Link
            className="flex items-center text-green-600 hover:underline"
            href="#"
          >
            <GrFormPreviousLink className="mr-2" /> {/* Adjust margin here */}
            Tiếp tục mua hàng
          </Link>
        </div>
      </main>
      <main className="container mx-auto my-8">
        <h1 className="text-center text-2xl font-bold mb-4">Giỏ hàng</h1>
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <Image
                alt="Product Image"
                className="h-24"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/f68eCf09yzZvApHoJzpBBy7heyPgoLpHzeeK0fOiueki0HSmTA.jpg"
                width="100"
              />
              <div>
                <p className="text-lg">Bột gạo lứt mè đen</p>
                <a className="text-red-500" href="#">
                  Xóa
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg">60.000đ</p>
              <div className="flex items-center border rounded">
                <button className="px-2">-</button>
                <input
                  className="w-8 text-center border-l border-r"
                  type="text"
                  value="1"
                />
                <button className="px-2">+</button>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link
              className="flex items-center text-green-600 hover:underline"
              href="#"
            >
              <GrFormPreviousLink className="mr-2" /> {/* Adjust margin here */}
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg mt-4 flex justify-between">
          <div className="w-1/2">
            <p className="text-lg">Tạm tính:</p>
            <p className="text-lg">Thành tiền:</p>
          </div>
          <div className="w-1/2 text-right">
            <p className="text-lg">60.000đ</p>
            <p className="text-lg font-bold">60.000đ</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg mt-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded mt-4 w-full">
            Tiến hành đặt hàng
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </main>
    </Fragment>
  );
}
