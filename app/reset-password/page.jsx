'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from '@/components/LoadingIcon';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post('/api/reset-password', {
        token,
        newPassword,
      });

      const data = await res.data;
      toast.success(data.message); // Hiển thị thông báo thành công
    } catch (error) {
      console.error('Reset password failed:', error);
      toast.error(error.message); // Hiển thị thông báo lỗi
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-800 flex items-center justify-center min-h-screen font-roboto">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-300 font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-center"
              disabled={loading} // Vô hiệu hóa nút khi loading
            >
              {loading ? (
                <>
                  <LoadingIcon />
                  <span className="ml-2">Resetting...</span>
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/admin/login" className="text-teal-500 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
