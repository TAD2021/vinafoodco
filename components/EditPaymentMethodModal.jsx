'use client';
import { useState, useEffect } from 'react';

const EditPaymentMethodModal = ({
  isOpen,
  onClose,
  paymentMethod,
  onUpdate,
}) => {
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (paymentMethod) {
      setDescription(paymentMethod.description || '');
    }
  }, [paymentMethod]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    onUpdate({ ...paymentMethod, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Edit Payment Method
        </h2>
        {paymentMethod && (
          <div className="text-black">
            <p>
              <strong>Payment Method ID:</strong> {paymentMethod.id}
            </p>
            <p>
              <strong>Name:</strong> {paymentMethod.name}
            </p>
            <div>
              <strong>Description:</strong>
              <textarea
                className="mt-2 w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPaymentMethodModal;
