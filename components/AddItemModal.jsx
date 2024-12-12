'use client';

import { useState } from 'react';
import slugify from 'slugify';

const AddItemModal = ({ isOpen, onClose, onAdd, itemType }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const generatedSlug = slugify(name, { lower: true }); // Tạo slug từ name
      const newItem = {
        name,
        slug: generatedSlug, // Sử dụng slug đã tạo
        ...(itemType === 'category' && { description }),
      };
      onAdd(newItem); // Truyền đối tượng mới
      resetFields();
    }
  };

  const resetFields = () => {
    setName('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-gray-800 rounded-lg p-6 z-10">
        <h2 className="text-lg font-bold mb-4">{`Add New ${
          itemType.charAt(0).toUpperCase() + itemType.slice(1)
        }`}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`${
              itemType.charAt(0).toUpperCase() + itemType.slice(1)
            } Name`}
            className="bg-gray-700 text-gray-300 rounded px-4 py-2 w-full mb-4"
            required
          />
          {itemType === 'category' && (
            <>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Category Description"
                className="bg-gray-700 text-gray-300 rounded px-4 py-2 w-full mb-4"
                rows="3"
              />
            </>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
