'use client';

import { useState } from 'react';

const AddTagModal = ({ isOpen, onClose, onAdd }) => {
  const [tagName, setTagName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagName) {
      onAdd(tagName);
      setTagName('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-gray-800 rounded-lg p-6 z-10">
        <h2 className="text-lg font-bold mb-4">Add New Tag</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Tag Name"
            className="bg-gray-700 text-gray-300 rounded px-4 py-2 w-full mb-4"
            required
          />
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
              Add Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTagModal;
