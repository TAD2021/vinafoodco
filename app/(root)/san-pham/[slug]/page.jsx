import ProductSlider from "@/components/ProductSlider";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

export default function Sanpham() {
  const teaProducts = [
    {
      title: "Trà thảo dược thanh lọc",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/lex7aEHW7MRzTi08pE6pxZlHC5mAcADyl4eC57PfqO37QRLnA.jpg",
      price: "60.000₫",
    },
    {
      title: "Trà 5 thực dưỡng",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/SdinWLJyfqwSD6O0zpxgLE1571rBWkFjCy8RYSNkAQpVU0yJA.jpg",
      price: "60.000₫",
    },
    {
      title: "Trà sữa yến mạch Thuận Hòa 300g",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/CjDoCIAvsn7FC53eCRNHaaQ7zNzM58LvMkMZ3eso4gvhoolTA.jpg",
      price: "60.000₫",
    },
    {
      title: "Trà thảo dược thanh lọc",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/lex7aEHW7MRzTi08pE6pxZlHC5mAcADyl4eC57PfqO37QRLnA.jpg",
      price: "60.000₫",
    },
    // Add more products as needed
  ];
  return (
    <main class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:mr-6">
          <div class=" bg-white rounded shadow p-6 mb-6">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-1/3">
                <img
                  alt="Product Image"
                  class="w-full"
                  height="400"
                  src="https://storage.googleapis.com/a1aa/image/vXn0WB7YLc5xN5O8LUcFgxlfsfR8Hr6L5iV8kfNDLeER0NYOB.jpg"
                  width="300"
                />
                <div class="flex mt-4">
                  <img
                    alt="Thumbnail 1"
                    class="w-1/3"
                    height="100"
                    src="https://storage.googleapis.com/a1aa/image/NaVpVal2XuIzPJKBcNlUGCfDnye9OE9imxLmCNWVaRZMdDmTA.jpg"
                    width="100"
                  />
                  <img
                    alt="Thumbnail 2"
                    class="w-1/3 mx-2"
                    height="100"
                    src="https://storage.googleapis.com/a1aa/image/z0THeRhRFRyEfEW1sebxRY9Yefox7O8lKfrwq494nXAZU3g5E.jpg"
                    width="100"
                  />
                  <img
                    alt="Thumbnail 3"
                    class="w-1/3"
                    height="100"
                    src="https://storage.googleapis.com/a1aa/image/UZnyXVoO8xKwDJYMIkZ5job01Sw8e3pOKOsDjoSADQ6quBzJA.jpg"
                    width="100"
                  />
                </div>
              </div>
              <div class="w-full lg:w-2/3 lg:ml-6 mt-6 lg:mt-0">
                <h1 class="text-2xl font-bold">Trà đậu đen xanh lòng</h1>
                <p class="text-xl text-green-600 mt-2">60,000₫</p>
                <p class="mt-4">
                  Thương hiệu:
                  <span class="font-bold">Thuận Hòa Food</span>
                </p>
                <p class="mt-2">
                  Tình trạng:
                  <span class="font-bold">Còn hàng</span>
                </p>
                <p class="mt-2">
                  SKU:
                  <span class="font-bold">123456</span>
                </p>
                <p class="mt-2">
                  Danh mục:
                  <span class="font-bold">Trà</span>
                </p>
                <p class="mt-2">
                  Tags:
                  <span class="font-bold">Trà, Đậu đen, Sức khỏe</span>
                </p>
                <div class="mt-4">
                  <label class="block text-gray-700" htmlFor="quantity">
                    Số lượng:
                  </label>
                  <input
                    class="border border-gray-300 p-2 w-20 mt-2"
                    id="quantity"
                    name="quantity"
                    type="number"
                    value="1"
                  />
                </div>
                <button class="bg-green-600 text-white px-4 py-2 mt-4">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
            <div class="mt-8">
              <h2 class="text-xl font-bold">Mô tả</h2>
              <p class="mt-4">
                Trà Đậu Đen Xanh Lòng Thuận Hòa là sản phẩm được làm từ đậu đen
                xanh lòng, một loại đậu có nhiều công dụng tốt cho sức khỏe. Trà
                có hương vị thơm ngon, dễ uống và có thể dùng hàng ngày.
              </p>
              <img
                alt="Product Description Image"
                class="w-full mt-4"
                height="800"
                src="https://storage.googleapis.com/a1aa/image/3kgCyGfc3eiTYkqp83zsPfKq5jVoQExvqvC0e30Uj4QS1NYOB.jpg"
                width="600"
              />
              <p class="text-center mt-2">
                Trà Đậu Đen Xanh Lòng Thuận Hòa 500g
              </p>
            </div>
            <div class="mt-8">
              <h2 class="text-xl font-bold">Hướng dẫn sử dụng</h2>
              <ul class="list-disc list-inside mt-4">
                <li>Rửa sạch đậu, để ráo.</li>
                <li>Cho đậu vào nồi, rang khô cho đến khi có mùi thơm.</li>
                <li>
                  Đun sôi nước, cho đậu đã rang vào, đun nhỏ lửa trong 10-15
                  phút.
                </li>
                <li>Lọc lấy nước, uống nóng hoặc lạnh tùy thích.</li>
              </ul>
            </div>
            <div class="mt-8">
              <h2 class="text-xl font-bold">Lưu ý</h2>
              <ul class="list-disc list-inside mt-4">
                <li>
                  Không sử dụng sản phẩm nếu bị dị ứng với bất kỳ thành phần nào
                  của sản phẩm.
                </li>
                <li>
                  Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.
                </li>
                <li>Để xa tầm tay trẻ em.</li>
              </ul>
            </div>
          </div>
          <div class=" bg-white rounded shadow p-6">
            <ProductSlider title="SẢN PHẨM TƯƠNG TỰ" products={teaProducts} />
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
