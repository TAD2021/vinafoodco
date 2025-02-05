'use client';
import { DeleteModal } from '@/components/DeleteModal';
import UserModal from '@/components/UserModal';
import axiosInstance from '@/utils/axiosInstance';
import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/users');
      if (response.data.status === 200) {
        setUsers(response.data.metadata);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await axiosInstance.post('/api/users', {
        email: userData.email,
        name: userData.name,
      });

      if (response.data.status === 200) {
        setUsers((prevUsers) => [...prevUsers, response.data.metadata]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add user:', response.data.message);
      }
    } catch (err) {
      console.error('Error adding user:', err.message);
    }
  };

  const handleDeleteClick = (tag) => {
    setUserToDelete(tag);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/users/${userToDelete.id}`);
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              className="bg-gray-800 text-gray-400 rounded-full pl-10 pr-4 py-2 w-full md:w-auto focus:outline-none"
              placeholder="Search for a tag"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)} // Mở modal thêm tag
          >
            Add New
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-2">{user.id}</td>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-gray-700 text-gray-400 px-4 py-2 rounded"
              disabled=""
            >
              Previous
            </button>
            <button className="bg-gray-700 text-gray-400 px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
      <footer className="text-center mt-4">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>
      {/* Hiển thị modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={userToDelete?.name}
        itemType="user"
      />
    </Fragment>
  );
}
