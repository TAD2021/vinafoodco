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
                <img
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

        <aside className="w-full lg:w-1/4 mt-6 lg:mt-0">
          <div className="bg-white p-4 shadow rounded mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">SHOP</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-orange-300 pb-2 last:border-b-0">
                <span className="text-gray-700">Bột Ngũ Cốc</span>
              </li>
              <li className="flex justify-between items-center border-b border-orange-300 pb-2 last:border-b-0">
                <span className="text-gray-700">Bột Đậu Xanh</span>
              </li>
              <li className="flex justify-between items-center border-b border-orange-300 pb-2 last:border-b-0">
                <span className="text-gray-700">Bột Đậu Đỏ</span>
              </li>
              <li className="flex justify-between items-center border-b border-orange-300 pb-2 last:border-b-0">
                <span className="text-gray-700">Bột Đậu Nành</span>
              </li>
              <li className="flex justify-between items-center border-b border-orange-300 pb-2 last:border-b-0">
                <span className="text-gray-700">Bột Đậu Đen</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 shadow rounded mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">MỚI VỀ</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <img
                  alt="Product Image 1"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/fPAOciTQHD2XQiwDAOfPciSy3PsYV7gbRAY6r614eCit31LnA.jpg"
                  width="60"
                />
                <div>
                  <p className="text-gray-700">Bột ngũ cốc khoai lang</p>
                  <p className="text-green-600">60.000đ</p>
                </div>
              </li>
              <li className="flex items-center">
                <img
                  alt="Product Image 2"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/3FRIfeq12IlsA0tHvzfd6fHRx7W5IpCWeiKfD48ui9cGfd9yJA.jpg"
                  width="60"
                />
                <div>
                  <p className="text-gray-700">Trà gạo lứt đỏ 300g</p>
                  <p className="text-green-600">60.000đ</p>
                </div>
              </li>
              <li className="flex items-center">
                <img
                  alt="Product Image 3"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/1XoxBPx4UXqZJxffC0PhpjvQAukTQMeDYp4kyKWPtjSu31LnA.jpg"
                  width="60"
                />
                <div>
                  <p className="text-gray-700">Trà đậu đỏ 300g</p>
                  <p className="text-green-600">60.000đ</p>
                </div>
              </li>
              <li className="flex items-center">
                <img
                  alt="Product Image 4"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/pgey6bBB6b1erkgPMdVaFiZPF2XKDd1UFSQ0iq5Xf6OR41LnA.jpg"
                  width="60"
                />
                <div>
                  <p className="text-gray-700">Trà đậu đen 300g</p>
                  <p className="text-green-600">60.000đ</p>
                </div>
              </li>
              <li className="flex items-center">
                <img
                  alt="Product Image 5"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/XSqooTskDhqqIlbxCDfR9xvyecrYBMfMv8iqh890serQwrXOB.jpg"
                  width="60"
                />
                <div>
                  <p className="text-gray-700">Bột ngũ cốc dinh dưỡng</p>
                  <p className="text-green-600">60.000đ</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-bold text-gray-800 mb-4">TIN HAY</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <img
                  alt="News Image 1"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/AaXQiVj0BLKAJVq4ytVprz6BHw1oDqDZVCKCb5mooInfd9yJA.jpg"
                  width="60"
                />
                <div className="flex-1">
                  <p className="text-gray-700 break-words">
                    5 SẢN PHẨM CỦA THUẬN HÒA ĐẠT OCOP 4 SAO NGÀY 06/12/2024
                  </p>
                  <div className="text-sm text-gray-500 flex items-center mt-1 flex-wrap">
                    <CiCalendar className="mr-1" />
                    <span>06/12/2024</span>
                    <span className="mx-2">|</span>
                    <FaEye className="mr-1" />
                    <span>1234</span>
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <img
                  alt="News Image 2"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/fcJMRRyC2ek2B0eT3mGVjqg9yfAuePYsnwAtmazRCjuveueyJA.jpg"
                  width="60"
                />
                <div className="flex-1">
                  <p className="text-gray-700 break-words">
                    Câu chuyện sản phẩm OCOP của Thuận Hòa
                  </p>
                  <div className="text-sm text-gray-500 flex items-center mt-1 flex-wrap">
                    <CiCalendar className="mr-1" />
                    <span>07/12/2024</span>
                    <span className="mx-2">|</span>
                    <FaEye className="mr-1" />
                    <span>5678</span>
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <img
                  alt="News Image 3"
                  className="w-16 h-16 object-cover rounded mr-4"
                  height="60"
                  src="https://storage.googleapis.com/a1aa/image/qlNFAXMBpkpUPla6zot4HMaYHEFRyJgDJXqWLxtCaoned9yJA.jpg"
                  width="60"
                />
                <div className="flex-1">
                  <p className="text-gray-700 break-words">
                    Hướng dẫn sử dụng sản phẩm OCOP
                  </p>
                  <div className="text-sm text-gray-500 flex items-center mt-1 flex-wrap">
                    <CiCalendar className="mr-1" />
                    <span>08/12/2024</span>
                    <span className="mx-2">|</span>
                    <FaEye className="mr-1" />
                    <span>9101</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
