'use client';
import axiosInstance from '@/utils/axiosInstance';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from '@/components/LoadingIcon';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post('/api/forgot-password', { email });
      console.log(res);
      const data = await res.data;
      toast.success(`${data.message}`);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-800 font-roboto">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-300 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-200 flex items-center justify-center"
              disabled={loading} // Vô hiệu hóa nút khi loading
            >
              {loading ? (
                <>
                  <LoadingIcon />
                  <span className="ml-2">Sending...</span>
                </>
              ) : (
                'Send Reset Link'
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
