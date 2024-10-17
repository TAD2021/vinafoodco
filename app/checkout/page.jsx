import Image from "next/image";
import { FaMoneyCheck } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

export default function Checkout() {
  return (
    <div class="container mx-auto p-4">
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="w-full lg:w-1/3 bg-white p-4 rounded shadow mb-4 lg:mb-0">
          <h2 class="text-lg font-bold mb-4">Thông Tin Mua Hàng</h2>
          <form>
            <div class="mb-4">
              <input
                class="w-full p-2 border rounded"
                placeholder="Họ tên (*)"
                type="text"
              />
            </div>
            <div class="mb-4">
              <input
                class="w-full p-2 border rounded"
                placeholder="Email (*)"
                type="email"
              />
            </div>
            <div class="mb-4">
              <input
                class="w-full p-2 border rounded"
                placeholder="Số điện thoại (*)"
                type="text"
              />
            </div>
            <div class="mb-4">
              <select class="w-full p-2 border rounded">
                <option>Tỉnh / Thành Phố (*)</option>
              </select>
            </div>
            <div class="mb-4">
              <select class="w-full p-2 border rounded">
                <option>Quận / Huyện (*)</option>
              </select>
            </div>
            <div class="mb-4">
              <select class="w-full p-2 border rounded">
                <option>Phường / Xã (*)</option>
              </select>
            </div>
            <div class="mb-4">
              <input
                class="w-full p-2 border rounded"
                placeholder="Địa chỉ (*)"
                type="text"
              />
            </div>
            <div class="mb-4">
              <input class="mr-2" id="different-address" type="checkbox" />
              <label for="different-address">Giao hàng tới địa chỉ khác</label>
            </div>
            <div class="mb-4">
              <textarea
                class="w-full p-2 border rounded"
                placeholder="Ghi chú"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="w-full lg:w-1/3 bg-white p-4 rounded shadow mb-4 lg:mb-0 mx-0 lg:mx-4">
          <div class="flex items-center mb-4">
            <Image
              alt="Logo Thuận Hòa"
              class="mr-4"
              src="https://storage.googleapis.com/a1aa/image/HfE5mbCkV6Q9fUxHClWc65vXUM3teCbPzSgihK1dlstkRRLnA.jpg"
              width={100}
              height={100}
            />
            <div>
              <h2 class="text-lg font-bold">Thông Tin Đặt Hàng</h2>
            </div>
          </div>
          <form>
            <div class="mb-4">
              <div className="flex">
                <input
                  class="mr-2"
                  id="bank-transfer"
                  name="payment-method"
                  type="radio"
                />
                <label class="flex items-center" for="bank-transfer">
                  <FaMoneyCheck className="mr-1" />
                  Chuyển Khoản Qua Ngân Hàng
                </label>
              </div>
              <p class="text-sm text-gray-600 ml-6">
                Bạn chuyển khoản qua các ngân hàng dưới đây, nội dung chuyển
                khoản: tên - số điện thoại - mã đơn hàng. Chủ tài khoản: Trần
                Quang Hiển, Ngân hàng Sacombank, số tài khoản 2726259373 - phòng
                giao dịch Bình Hòa.
              </p>
            </div>
            <div class="mb-4">
              <div className="flex">
                <input
                  class="mr-2"
                  id="cod"
                  name="payment-method"
                  type="radio"
                />
                <label class="flex items-center" for="cod">
                  <FaMoneyBill className="mr-1" />
                  Thu Tiền Tận Nơi - COD
                </label>
              </div>
              <p class="text-sm text-gray-600 ml-6">
                Chúng tôi giao hàng và thu tiền tận nơi của bạn.
              </p>
            </div>
          </form>
        </div>
        <div class="w-full lg:w-1/3 bg-white p-4 rounded shadow">
          <h2 class="text-lg font-bold mb-4">Đơn Hàng Của Bạn</h2>
          <div class="flex items-center mb-4">
            <Image
              alt="Bột gạo lứt mè đen"
              class="mr-4"
              src="https://storage.googleapis.com/a1aa/image/RHjlje5JvKSAZ6w4kHHaR9tV96RyuWT7HIMdff2D6muAykMnA.jpg"
              width={50}
              height={50}
            />
            <div class="flex-1">
              <p>Bột gạo lứt mè đen</p>
              <p class="text-sm text-gray-600">60.000đ × 1</p>
            </div>
            <p>60.000đ</p>
          </div>
          <div class="flex items-center mb-4">
            <Image
              alt="Trà gạo lứt đậu đỏ Thuận Hòa 300g"
              class="mr-4"
              src="https://storage.googleapis.com/a1aa/image/HjXWFo5ZMbY1ANNfKpSEUQTeTuYs2t90A776iqla67T9YSmTA.jpg"
              width={50}
              height={50}
            />
            <div class="flex-1">
              <p>Trà gạo lứt đậu đỏ Thuận Hòa 300g</p>
              <p class="text-sm text-gray-600">60.000đ × 1</p>
            </div>
            <p>60.000đ</p>
          </div>
          <div class="border-t pt-4">
            <div class="flex justify-between mb-2">
              <p>Tạm tính</p>
              <p>120.000đ</p>
            </div>
            <div class="flex justify-between font-bold text-lg">
              <p>Thành tiền</p>
              <p>120.000đ</p>
            </div>
          </div>
          <div class="mt-4">
            <button class="w-full bg-blue-500 text-white p-2 rounded">
              Đặt mua
            </button>
          </div>
          <div class="mt-4 text-center">
            <a class="text-blue-500" href="#">
              Xem giỏ hàng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
