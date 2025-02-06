'use client';

import useRoutes from '@/hooks/useRoutes';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import axiosInstance from '@/utils/axiosInstance';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State để lưu danh mục
  const routes = useRoutes();

  // Hàm để lấy danh mục từ API
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      if (response.data && response.data.metadata) {
        setCategories(response.data.metadata); // Lưu danh mục vào state
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.sidebar')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Fragment>
      <button
        className="p-4 bg-emerald-600 text-white rounded-full shadow-md lg:hidden"
        onClick={handleToggle}
      >
        <FaBars />
      </button>
      {isOpen && (
        <div
          className={`sidebar fixed top-0 left-0 w-60 z-50 h-screen bg-emerald-600 text-white p-4 transition duration-300 translate-x-0`}
        >
          <div className="w-full max-w-xs mx-auto">
            <div className="bg-emerald-600 text-white p-4 rounded">
              <ul className="mt-4 space-y-2">
                {routes.map((item) => (
                  <SidebarItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    active={item.active}
                  />
                ))}
                {/* Hiển thị danh mục từ API */}
                <li className="py-2 border-b border-green-500 transition duration-300 font-bold">
                  <Link href="/danh-muc">DANH MỤC</Link>
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="py-2 border-b border-green-500 hover:text-white transition duration-300"
                  >
                    <Link href={`/danh-muc/${category.slug}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Sidebar;
