'use client';
import Image from 'next/image';
import {
  FaExchangeAlt,
  FaCogs,
  FaSignOutAlt,
  FaBox,
  FaTachometerAlt,
  FaUsers,
  FaTags,
  FaMoneyBill,
} from 'react-icons/fa';
import { MdArticle } from 'react-icons/md';
import { TbCategoryFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import { logout } from '@/redux/authSlice';

export const Sidebar = ({ isOpen, toggleSidebar, currentPath }) => {
  const dispatch = useDispatch(); // Sử dụng useDispatch để dispatch action
  const router = useRouter();
  const { id, accessToken } = useSelector((state) => state.auth);

  const handleLogoutClick = async () => {
    try {
      await axiosInstance.post(
        '/api/auth/logout',
        {},
        {
          headers: {
            'x-client-id': id,
            Authorization: accessToken,
          },
        }
      );

      dispatch(logout());

      // Chuyển hướng đến trang login
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-800 p-4 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:w-1/5 w-1/3 z-50`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Image
            width={50}
            height={50}
            alt="User  profile picture"
            className="rounded-full mr-4"
            src="https://storage.googleapis.com/a1aa/image/eZwkVHxKW1y3NKXhvxeRcbCOdCwHTV6aThPbl0fik3MgIjWnA.jpg"
          />
          <div>
            <div className="font-bold">user1</div>
            <div className="text-sm text-gray-400">Administrator</div>
          </div>
        </div>
        <button className="md:hidden text-gray-400" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/dashboard' ? 'bg-gray-700' : ''
              }`}
              href="/admin/dashboard"
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/users' ? 'bg-gray-700' : ''
              }`}
              href="/admin/users"
            >
              <FaUsers className="mr-3" />
              Users
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/products' ? 'bg-gray-700' : ''
              }`}
              href="/admin/products"
            >
              <FaBox className="mr-3" />
              Products
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/posts' ? 'bg-gray-700' : ''
              }`}
              href="/admin/posts"
            >
              <MdArticle className="mr-3" />
              Posts
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/transactions' ? 'bg-gray-700' : ''
              }`}
              href="/admin/transactions"
            >
              <FaExchangeAlt className="mr-3" />
              Transactions
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/tags' ? 'bg-gray-700' : ''
              }`}
              href="/admin/tags"
            >
              <FaTags className="mr-3" />
              Tags
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/categories' ? 'bg-gray-700' : ''
              }`}
              href="/admin/categories"
            >
              <TbCategoryFilled className="mr-3" />
              Categories
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/payment' ? 'bg-gray-700' : ''
              }`}
              href="/admin/payment"
            >
              <FaMoneyBill className="mr-3" />
              Payment Methods
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/settings' ? 'bg-gray-700' : ''
              }`}
              href="/admin/settings"
            >
              <FaCogs className="mr-3" />
              Settings
            </a>
          </li>
          <li className="mb-4" onClick={handleLogoutClick}>
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/logout' ? 'bg-gray-700' : ''
              }`}
              href="#"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
