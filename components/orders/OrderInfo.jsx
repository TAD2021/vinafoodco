import Image from "next/image";
import { FaMoneyBill, FaCreditCard } from "react-icons/fa";

export default function OrderInfo({ paymentMethod, paymentMethods, setPaymentMethod }) {  
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow mb-4 lg:mb-0 mx-0 lg:mx-4">
      <div className="flex items-center mb-4">
        <Image alt="Logo Thuận Hòa"
          className="mr-4"
          src="https://storage.googleapis.com/a1aa/image/HfE5mbCkV6Q9fUxHClWc65vXUM3teCbPzSgihK1dlstkRRLnA.jpg"
          width={100}
          height={100}
        />
        <div>
          <h2 className="text-lg font-bold ">Thông Tin Đặt Hàng</h2>
        </div>
      </div>
      <form>
        {paymentMethods.map((method) => (
          <div className="mb-4" key={method.id}>
            <div className="flex">
              <input
                className="mr-2"
                id={method.code}
                name="payment-method"
                type="radio"
                value={method.code}
                defaultChecked={method.code === paymentMethod} // Đặt phương thức thanh toán mặc định
                onChange={handlePaymentChange}
              />
              <label className="flex items-center" htmlFor={method.code}>
                {method.code === 'bank-transfer' ? <FaCreditCard className="mr-1" /> : <FaMoneyBill className="mr-1" />}
                {method.name}
              </label>
            </div>
            {/* Chỉ hiển thị mô tả nếu phương thức thanh toán được chọn */}
            {method.code === paymentMethod && (
              <p className="text-sm text-gray-600 ml-6">
                {method.description}
              </p>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}