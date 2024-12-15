'use client';

import Image from 'next/image';
import {
  FaExchangeAlt,
  FaSignOutAlt,
  FaQuestionCircle,
  FaBox,
  FaTachometerAlt,
  FaUsers,
  FaTags,
} from 'react-icons/fa';
import { TbCategoryFilled } from 'react-icons/tb';
import { MdPayments } from 'react-icons/md';
import { GrArticle } from 'react-icons/gr';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import axiosInstance from '@/utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';

export const Sidebar = ({ isOpen, toggleSidebar, currentPath }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth); // Access user information from Redux

  const handleLogout = async () => {
    try {
      // Send user information with the logout request
      await axiosInstance.post('/api/auth/logout', null, {
        headers: {
          [HEADER.CLIENT_ID]: user.id, // Include CLIENT_ID
          [HEADER.REFRESHTOKEN]: user.refreshToken, // Include refreshToken
          [HEADER.AUTHORIZATION]: `Bearer ${user.accessToken}`, // Include accessToken
        },
      });

      // Dispatch the logout action to update Redux state
      dispatch(logoutAction());

      // Redirect to the login page
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.'); // Show an error message if logout fails
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
                currentPath === '/admin/payments' ? 'bg-gray-700' : ''
              }`}
              href="/admin/payments"
            >
              <MdPayments className="mr-3" />
              Payments
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/posts' ? 'bg-gray-700' : ''
              }`}
              href="/admin/posts"
            >
              <GrArticle className="mr-3" />
              Posts
            </a>
          </li>
          <li className="mb-4">
            <a
              className={`flex items-center p-2 ${
                currentPath === '/admin/help' ? 'bg-gray-700' : ''
              }`}
              href="/admin/help"
            >
              <FaQuestionCircle className="mr-3" />
              Help
            </a>
          </li>
          <li className="mb-4">
            <button
              className={`flex items-center p-2 ${
                currentPath === '/admin/logout' ? 'bg-gray-700' : ''
              }`}
              onClick={handleLogout} // Gọi hàm handleLogout khi nhấn nút
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
