import { formatCurrency } from '@/utils/formatCurrency';

const OrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/2">
        {' '}
        {/* Thay đổi kích thước modal */}
        <h2 className="text-2xl font-bold mb-4 text-black">
          Order Details
        </h2>{' '}
        {/* Thay đổi màu chữ */}
        {order && (
          <div className="text-black">
            {' '}
            {/* Thay đổi màu chữ cho toàn bộ nội dung */}
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Recipient:</strong> {order.recipient}
            </p>
            <p>
              <strong>Phone Number:</strong> {order.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {order.street}, {order.ward},{' '}
              {order.district}, {order.province}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total Price:</strong> {formatCurrency(order.totalPrice)}
            </p>
            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.productName} - {item.quantity} x{' '}
                  {formatCurrency(item.price)}
                </li>
              ))}
            </ul>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200" // Thêm hiệu ứng hover
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
