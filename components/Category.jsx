"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Category() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(pathname === "/" ? true : false);

  const toggleMenu = () => {
    if (pathname !== "/") {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <div className="w-64 relative">
      <div
        className="bg-yellow-500 flex items-center p-2 cursor-pointer"
        onClick={toggleMenu}
      >
        <i className="fas fa-bars text-black"></i>
        <span className="ml-2 hover:text-gray-200 font-bold">DANH MỤC</span>
      </div>
      <div
        id="menu"
        className={`bg-white absolute w-full ${menuOpen ? "block" : "hidden"}`}
      >
        <ul>
          <li className="border-t border-b border-gray-300 p-2">
            <span className="text-gray-800">Trà Thanh Lọc</span>
          </li>
          <li className="border-t border-b border-gray-300 p-2">
            <span className="text-gray-800">Bột Thực Dưỡng</span>
          </li>
          <li className="border-t border-b border-gray-300 p-2 flex justify-between items-center">
            <span className="text-gray-800">Bột Dinh Dưỡng Bổ Sung</span>
            <i className="fas fa-chevron-right text-gray-500"></i>
          </li>
          <li className="border-t border-b border-gray-300 p-2 flex justify-between items-center">
            <span className="text-gray-800">Bột Ăn Dặm</span>
            <i className="fas fa-chevron-right text-gray-500"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Category;
