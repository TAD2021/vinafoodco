import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

function Aside() {
  return (
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
            <Image
              alt="Product Image 1"
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://storage.googleapis.com/a1aa/image/fPAOciTQHD2XQiwDAOfPciSy3PsYV7gbRAY6r614eCit31LnA.jpg"
              width={60}
              height={60}
            />
            <div>
              <p className="text-gray-700">Bột ngũ cốc khoai lang</p>
              <p className="text-green-600">60.000đ</p>
            </div>
          </li>
          <li className="flex items-center">
            <Image
              alt="Product Image 2"
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://storage.googleapis.com/a1aa/image/3FRIfeq12IlsA0tHvzfd6fHRx7W5IpCWeiKfD48ui9cGfd9yJA.jpg"
              width={60}
              height={60}
            />
            <div>
              <p className="text-gray-700">Trà gạo lứt đỏ 300g</p>
              <p className="text-green-600">60.000đ</p>
            </div>
          </li>
          <li className="flex items-center">
            <Image
              alt="Product Image 3"
              className="w-16 h-16 object-cover rounded mr-4"
              width={60}
              height={60}
              src="https://storage.googleapis.com/a1aa/image/1XoxBPx4UXqZJxffC0PhpjvQAukTQMeDYp4kyKWPtjSu31LnA.jpg"
            />
            <div>
              <p className="text-gray-700">Trà đậu đỏ 300g</p>
              <p className="text-green-600">60.000đ</p>
            </div>
          </li>
          <li className="flex items-center">
            <Image
              alt="Product Image 4"
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://storage.googleapis.com/a1aa/image/pgey6bBB6b1erkgPMdVaFiZPF2XKDd1UFSQ0iq5Xf6OR41LnA.jpg"
              width={60}
              height={60}
            />
            <div>
              <p className="text-gray-700">Trà đậu đen 300g</p>
              <p className="text-green-600">60.000đ</p>
            </div>
          </li>
          <li className="flex items-center">
            <Image
              alt="Product Image 5"
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://storage.googleapis.com/a1aa/image/XSqooTskDhqqIlbxCDfR9xvyecrYBMfMv8iqh890serQwrXOB.jpg"
              width={60}
              height={60}
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
            <Image
              alt="News Image 1"
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://storage.googleapis.com/a1aa/image/AaXQiVj0BLKAJVq4ytVprz6BHw1oDqDZVCKCb5mooInfd9yJA.jpg"
              width={60}
              height={60}
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
            <Image
              alt="News Image 2"
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://storage.googleapis.com/a1aa/image/fcJMRRyC2ek2B0eT3mGVjqg9yfAuePYsnwAtmazRCjuveueyJA.jpg"
              width={60}
              height={60}
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
            <Image
              alt="News Image 3"
              className="w-16 h-16 object-cover rounded mr-4"
              src="https://storage.googleapis.com/a1aa/image/qlNFAXMBpkpUPla6zot4HMaYHEFRyJgDJXqWLxtCaoned9yJA.jpg"
              width={60}
              height={60}
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
  );
}

export default Aside;
