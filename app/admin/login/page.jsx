'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter
import { login } from '@/redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from '@/components/LoadingIcon';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter(); // Khởi tạo router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      toast.success('Đăng nhập thành công!');

      // Lưu thông tin người dùng vào Redux
      dispatch(
        login({
          name: data.metadata.user.name,
          email: data.metadata.user.email,
          accessToken: data.metadata.tokens.accessToken,
          refreshToken: data.metadata.tokens.refreshToken, // Lưu refreshToken
        })
      );
      router.push('/admin/dashboard'); // Sử dụng router.push để điều hướng
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded bg-teal-600 text-white font-bold hover:bg-teal-700"
            disabled={loading} // Vô hiệu hóa nút khi loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingIcon />
                Đang đăng nhập...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </>
  );
}
