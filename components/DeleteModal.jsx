export const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-lg font-bold text-black">Confirm Deletion</h2>{' '}
        {/* Changed color to black */}
        <p className="text-black">
          {' '}
          {/* Changed color to black */}
          Are you sure you want to delete this product:
          <strong className="text-black">{productName}</strong>{' '}
          {/* Changed color to black */}?
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
