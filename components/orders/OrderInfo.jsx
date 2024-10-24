import Image from "next/image";
import { FaMoneyCheck, FaMoneyBill } from "react-icons/fa";

export default function OrderInfo() {
  return (
    <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow mb-4 lg:mb-0 mx-0 lg:mx-4">
      <div className="flex items-center mb-4">
        <Image
          alt="Logo Thuận Hòa"
          className="mr-4"
          src="https://storage.googleapis.com/a1aa/image/HfE5mbCkV6Q9fUxHClWc65vXUM3teCbPzSgihK1dlstkRRLnA.jpg"
          width={100}
          height={100}
        />
        <div>
          <h2 className="text-lg font-bold">Thông Tin Đặt Hàng</h2>
        </div>
      </div>
      <form>
        <div className="mb-4">
          <div className="flex">
            <input
              className="mr-2"
              id="bank-transfer"
              name="payment-method"
              type="radio"
            />
            <label className="flex items-center" htmlFor="bank-transfer">
              <FaMoneyCheck className="mr-1" />
              Chuyển Khoản Qua Ngân Hàng
            </label>
          </div>
          <p className="text-sm text-gray-600 ml-6">
            Bạn chuyển khoản qua các ngân hàng dưới đây, nội dung chuyển
            khoản: tên - số điện thoại - mã đơn hàng. Chủ tài khoản: Trần
            Quang Hiển, Ngân hàng Sacombank, số tài khoản 2726259373 - phòng
            giao dịch Bình Hòa.
          </p>
        </div>
        <div className="mb-4 ">
          <div className="flex">
            <input
              className="mr-2"
              id="cod"
              name="payment-method"
              type="radio"
            />
            <label className="flex items-center" htmlFor="cod">
              <FaMoneyBill className="mr-1" />
              Thu Tiền Tận Nơi - COD
            </label>
          </div>
          <p className="text-sm text-gray-600 ml-6">
            Chúng tôi giao hàng và thu tiền tận nơi của bạn.
          </p>
        </div>
      </form>
    </div>
  );
}