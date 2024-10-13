import Link from "next/link";
import { Fragment } from "react";
import { GrFormPreviousLink } from "react-icons/gr";

export default function Cart() {
  return (
    <Fragment>
      <main className="container mx-auto my-8">
        <h1 class="text-center text-2xl font-bold mb-4">Giỏ hàng</h1>
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
      <main class="container mx-auto my-8">
        <h1 class="text-center text-2xl font-bold mb-4">Giỏ hàng</h1>
        <div class="bg-white p-4 shadow rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-4">
              <img
                alt="Product Image"
                class="h-24"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/f68eCf09yzZvApHoJzpBBy7heyPgoLpHzeeK0fOiueki0HSmTA.jpg"
                width="100"
              />
              <div>
                <p class="text-lg">Bột gạo lứt mè đen</p>
                <a class="text-red-500" href="#">
                  Xóa
                </a>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <p class="text-lg">60.000đ</p>
              <div class="flex items-center border rounded">
                <button class="px-2">-</button>
                <input
                  class="w-8 text-center border-l border-r"
                  type="text"
                  value="1"
                />
                <button class="px-2">+</button>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <Link
              className="flex items-center text-green-600 hover:underline"
              href="#"
            >
              <GrFormPreviousLink className="mr-2" /> {/* Adjust margin here */}
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
        <div class="bg-white p-4 shadow rounded-lg mt-4 flex justify-between">
          <div class="w-1/2">
            <p class="text-lg">Tạm tính:</p>
            <p class="text-lg">Thành tiền:</p>
          </div>
          <div class="w-1/2 text-right">
            <p class="text-lg">60.000đ</p>
            <p class="text-lg font-bold">60.000đ</p>
          </div>
        </div>
        <div class="bg-white p-4 shadow rounded-lg mt-4">
          <button class="bg-green-700 text-white px-4 py-2 rounded mt-4 w-full">
            Tiến hành đặt hàng
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </main>
    </Fragment>
  );
}
