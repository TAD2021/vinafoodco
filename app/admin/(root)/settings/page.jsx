'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PasswordModal from '@/components/PasswordModal';
import axiosInstance from '@/utils/axiosInstance';

export default function Settings() {
  const { id, name, email } = useSelector((state) => state.auth); // Lấy thông tin từ Redux store
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  // State để quản lý form thông tin cá nhân
  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
  });

  // State để quản lý form đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Xử lý sự kiện khi người dùng thay đổi thông tin cá nhân
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý sự kiện khi người dùng thay đổi thông tin mật khẩu
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Xử lý sự kiện khi người dùng submit form thông tin cá nhân
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post(`/api/users/${id}`, formData);
    const data = response.data.metadata;
    setFormData({
      name: data.name,
      email: data.email,
    });
  };

  // Xử lý sự kiện khi người dùng submit form đổi mật khẩu
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới có khớp nhau không
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }
    // Gọi API hoặc xử lý logic đổi mật khẩu ở đây
    await axiosInstance.post(`/api/users/${id}`, passwordData);
    alert('Đổi mật khẩu thành công!');
    // Reset form đổi mật khẩu
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Settings
        </h1>

        {/* Form thông tin cá nhân */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>

        {/* Nút mở modal đổi mật khẩu */}
        <button
          type="button"
          onClick={openPasswordModal}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Change Password
        </button>

        {/* Modal đổi mật khẩu */}
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={closePasswordModal}
          onSubmit={handlePasswordSubmit}
          passwordData={passwordData}
          onPasswordChange={handlePasswordChange}
        />
      </div>
    </div>
  );
}
