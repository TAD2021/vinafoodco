'use client';

import axiosInstance from '@/utils/axiosInstance';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';

function Aside() {
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

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

    const fetchNewProducts = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/products?page=1&limit=5'
        );
        setNewProducts(response.data?.metadata?.products);
      } catch (error) {
        console.error('Error fetching new products:', error);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setLatestPosts(data);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };

    fetchCategories();
    fetchNewProducts();
    fetchLatestPosts();
  }, []);

  return (
    <aside className="w-full lg:w-1/4 mt-6 lg:mt-0">
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">SHOP</h3>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center border-b border-orange-300 pb-2 last:border-b-0"
            >
              <Link href={category.slug} passHref>
                <span className="text-gray-700">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          SẢN PHẨM MỚI NHẤT
        </h3>
        <ul className="space-y-4">
          {' '}
          {/* Giữ space-y-4 để có khoảng cách giữa các sản phẩm */}
          {newProducts.map((product) => (
            <Link key={product.slug} href={`/san-pham/${product.slug}`}>
              <li className="flex items-center mb-4">
                {' '}
                {/* Thêm margin-bottom cho mỗi sản phẩm */}
                <Image
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                  src={product.image || '/placeholder-image.png'}
                  width={60}
                  height={60}
                />
                <div>
                  <p className="text-gray-700">{product.name}</p>
                  <p className="text-green-600">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold text-gray-800 mb-4">TIN MỚI NHẤT</h3>
        <ul className="space-y-4">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/${post.type}/${post.slug}`}>
              <li className="flex items-center">
                <Image
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                  src={post.thumbnail || '/placeholder-image.png'}
                  width={60}
                  height={60}
                />
                <div className="flex-1">
                  <p className="text-gray-700 break-words">{post.title}</p>
                  <div className="text-sm text -gray-500 flex items-center mt-1 flex-wrap">
                    <CiCalendar className="mr-1" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
