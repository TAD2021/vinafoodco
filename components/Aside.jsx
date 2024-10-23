'use client'

import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

function Aside() {
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchNewProducts = async () => {
      try {
        const response = await fetch('/api/products?new=true');
        const data = await response.json();
        setNewProducts(data);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    fetchCategories();
    fetchNewProducts();
  }, []);

  return (
    <aside className="w-full lg:w-1/4 mt-6 lg:mt-0">
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">SHOP</h3>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li  key={category.id} className="flex justify-between items-center border-b border-orange-300 pb-2 last:border-b-0">
              <Link href={category.slug} passHref>
                <span className="text-gray-700">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">MỚI VỀ</h3>
        <ul className="space-y-4">
          {newProducts.map((product) => (
            <Link key={product.slug} href={product.slug}>
              <li  className="flex items-center">
                <Image
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                  src={product.image || "/placeholder-image.png"} // Hình ảnh dự phòng nếu không có
                  width={60}
                  height={60}
                />
                <div>
                  <p className="text-gray-700">{product.name}</p>
                  <p className="text-green-600">{formatCurrency(product.price)}</p>
                </div>
              </li>
            </Link>
          ))}
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
