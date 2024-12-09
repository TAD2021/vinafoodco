'use client';

import { DeleteModal } from '@/components/DeleteModal';
import OrderModal from '@/components/OrderModal';
import axiosInstance from '@/utils/axiosInstance';
import { formatCurrency } from '@/utils/formatCurrency';
import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Transactions() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null); // Để lưu thông tin đơn hàng đã chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Để điều khiển hiển thị modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/orders?page=${currentPage}`
        );
        const data = response.data;
        if (response.status >= 200 && response.status < 400) {
          setOrders(data.metadata.orders);
          setTotalPages(data.metadata.totalPages);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axiosInstance.put(`/api/orders/${orderId}`, {
        status: newStatus,
      });
      if (response.status >= 200 && response.status < 400) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const openModal = async (orderId) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${orderId}`);
      if (response.status >= 200 && response.status < 400) {
        setSelectedOrder(response.data.metadata); // Lưu thông tin đơn hàng vào state
        setIsModalOpen(true);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/orders/${orderToDelete.id}`);
      setOrders(orders.filter((order) => order.id !== orderToDelete.id));
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              className="bg-gray-800 text-gray-400 rounded-full pl-10 pr-4 py-2 w-full md:w-auto focus:outline-none"
              placeholder="Search for an order"
              type="text"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer Name</th>
                <th className="py-2">Total Price</th>
                <th className="py-2">Status</th>
                <th className="py-2">Created At</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="py-2">{order.id}</td>
                  <td className="py- 2">{order.recipient}</td>
                  <td className="py-2">{formatCurrency(order.totalPrice)}</td>
                  <td className="py-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="bg-gray-700 text-gray-300 rounded"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELED">Canceled</option>
                    </select>
                  </td>
                  <td className="py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => openModal(order.id)} // Gọi hàm openModal với order.id
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      View
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteClick(order)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={selectedOrder}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={orderToDelete?.id}
        itemType="order"
      />
    </Fragment>
  );
}
