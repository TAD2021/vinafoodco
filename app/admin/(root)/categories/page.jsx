'use client';

import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { DeleteModal } from '@/components/DeleteModal';
import axiosInstance from '@/utils/axiosInstance';
import LoadingIcon from '@/components/LoadingIcon';
import AddItemModal from '@/components/AddItemModal';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/categories');
      if (response.data.status === 200) {
        setCategories(response.data.metadata);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (categoryData) => {
    try {
      const response = await axiosInstance.post(
        '/api/categories',
        categoryData
      );
      if (response.status === 201) {
        fetchCategories();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Error creating category');
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/categories/${categoryToDelete.id}`);
      setCategories(
        categories.filter((category) => category.id !== categoryToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingIcon />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              className="bg-gray-800 text-gray-400 rounded-full pl-10 pr-4 py-2 w-full md:w-auto focus:outline-none"
              placeholder="Search for a category"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)} // Mở modal thêm danh mục
          >
            Add New
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Category Name</th>
                <th className="py-2">Slug</th>
                <th className="py-2">Description</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-gray-700">
                  <td className="py-2">{category.name}</td>
                  <td className="py-2">{category.slug}</td>
                  <td className="py-2">{category.description || 'N/A'}</td>
                  <td className="py-2">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteClick(category)}
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
              disabled
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

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCategory}
        itemType="category"
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={categoryToDelete?.name}
        itemType="category"
      />
    </Fragment>
  );
}
