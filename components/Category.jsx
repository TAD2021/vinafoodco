'use client';

import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';

function Category() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Hàm để toggle menu
  const toggleMenu = () => {
    if (pathname !== '/') {
      setMenuOpen(!menuOpen);
    }
  };

  // Gọi API để lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories');
        const data = response.data?.metadata;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Theo dõi sự thay đổi của pathname
  useEffect(() => {
    if (pathname === '/') {
      setMenuOpen(true); // Mở menu khi ở trang chính
    } else {
      setMenuOpen(false); // Đóng menu khi ở các trang khác
    }
  }, [pathname]);

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
        className={`bg-white absolute w-full ${menuOpen ? 'block' : 'hidden'}`}
      >
        <ul>
          {categories.map((category) => (
            <Link href={`/danh-muc/${category.slug}`} key={category.id}>
              <li className="border-t border-b border-gray-300 p-2">
                <span className="text-gray-800">{category.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;
