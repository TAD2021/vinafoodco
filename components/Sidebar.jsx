"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".sidebar")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Fragment>
      <button
        className="p-4 bg-green-600 text-white rounded-full shadow-md lg:hidden"
        onClick={handleToggle}
      >
        <FaBars />
      </button>
      {isOpen && (
        <div
          className={`sidebar fixed top-0 left-0 w-60 z-50 h-screen bg-green-600 text-white p-4 transition duration-300 translate-x-0`}
        >
          <div className="w-full max-w-xs mx-auto">
            <div className="bg-green-600 text-white p-4 rounded">
              <ul className="mt-4 space-y-2">
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/">TRANG CHỦ</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/gioi-thieu">GIỚI THIỆU</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/tin-tuc">TIN TỨC</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/chinh-sach">CHÍNH SÁCH</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/khuyen-mai">KHUYẾN MÃI</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/lien-he">LIÊN HỆ</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300 font-bold">
                  <Link href="/danh-muc">DANH MỤC</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/tra-thanh-loc">Trà Thanh Lọc</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300">
                  <Link href="/bot-thuc-pham">Bột Thực Dưỡng</Link>
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300 flex justify-between items-center">
                  <Link href="/bot-dinh-duong-bo-sung">
                    Bột Dinh Dưỡng Bổ Sung
                  </Link>
                  <i className="fas fa-plus text-yellow-500" />
                </li>
                <li className="py-2 border-b border-green-500 hover:bg-green-700 hover:text-white transition duration-300 flex justify-between items-center">
                  <Link href="/bot-an-dam">Bột Ăn Dặm</Link>
                  <i className="fas fa-plus text-yellow-500" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Sidebar;
