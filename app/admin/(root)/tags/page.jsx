'use client';

import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { DeleteModal } from '@/components/DeleteModal';
import AddTagModal from '@/components/AddTagModal'; // Import modal mới
import axiosInstance from '@/utils/axiosInstance';
import LoadingIcon from '@/components/LoadingIcon';

export default function TagsAdmin() {
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/tags');
      if (response.data.status === 200) {
        setTags(response.data.metadata);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async (tagName) => {
    try {
      const response = await axiosInstance.post('/api/tags', { name: tagName });
      if (response.status === 201) {
        fetchTags();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating tag:', error);
      setError('Error creating tag');
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (tag) => {
    setTagToDelete(tag);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/tags/${tagToDelete.id}`);
      setTags(tags.filter((tag) => tag.id !== tagToDelete.id));
      setIsDeleteModalOpen(false);
      setTagToDelete(null);
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
                <th className="py-2">Tag Name</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTags.map((tag) => (
                <tr key={tag.id} className="border-b border-gray-700">
                  <td className="py-2">{tag.name}</td>
                  <td className="py-2">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteClick(tag)}
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

      <AddTagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTag} // Gọi hàm thêm tag
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={tagToDelete?.name}
        itemType="tag"
      />
    </Fragment>
  );
}
