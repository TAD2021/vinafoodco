import Aside from "@/components/Aside";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

export default function GioiThieu() {
  return (
    <main className="container mx-auto mt-6 px-6">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">TIN TỨC</h2>
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow rounded flex flex-col md:flex-row items-start"
              >
                <Image
                  width={200}
                  height={200}
                  alt={`News Image ${index + 1}`}
                  className="w-full md:w-48 h-48 object-cover rounded mb-4 md:mb-0 md:mr-4"
                  src="https://storage.googleapis.com/a1aa/image/AaXQiVj0BLKAJVq4ytVprz6BHw1oDqDZVCKCb5mooInfd9yJA.jpg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    5 SẢN PHẨM CỦA THUẬN HÒA ĐẠT OCOP 4 SAO NGÀY 06/12/2024
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <CiCalendar />
                    <p className="ml-1">06/12/2024</p>
                    <span className="mx-2">|</span>
                    <FaEye />
                    <p className="ml-1">1234</p>
                  </div>
                  <p className="text-gray-700 mt-2">
                    Ngày 6-12, tại Hội nghị đánh giá và xếp hạng sản phẩm OCOP
                    (Chương trình Mỗi xã một sản phẩm) cấp thành phố năm 2024,
                    Hội đồng đánh giá, xếp hạng sản phẩm OCOP thành phố Cần Thơ
                    đã công nhận 5 sản phẩm của Hợp tác xã Nông nghiệp Ngọc
                    Hoàng, huyện Phong Điền đạt OCOP 4 sao. Các sản phẩm gồm:
                    Bột ngũ cốc dinh dưỡng, Bột đậu xanh, Bột đậu đỏ, Bột đậu
                    nành, Bột đậu đen.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Aside/>
      </div>
    </main>
  );
}
