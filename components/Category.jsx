"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

function Category() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(pathname === "/" ? true : false);
  const [categories, setCategories] = useState([]);

  const toggleMenu = () => {
    if (pathname !== "/") {
      setMenuOpen(!menuOpen);
    }
  };

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

    fetchCategories();
  },[])

  return (
    <div className="w-64 relative">
      <div
        className="bg-yellow-300 flex items-center p-2 cursor-pointer"
        onClick={toggleMenu}
      >
        <FaBars />
        <span className="ml-2 font-bold">DANH MỤC</span>
      </div>
      <div
        id="menu"
        className={`bg-white absolute w-full ${menuOpen ? "block" : "hidden"}`}
      >
        <ul>
          {categories.map((category) => (
            <Link href={category.slug} key={category.id}>
              <li className="border-t border-b border-gray-300 p-2">
                <span className="text-gray-800">{category.name}</span>
              </li>
            </Link>
          ))}
          
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
