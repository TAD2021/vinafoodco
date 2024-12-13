'use client';

import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '@/utils/axiosInstance';
import LoadingIcon from '@/components/LoadingIcon';
import EditPaymentMethodModal from '@/components/EditPaymentMethodModal';

export default function Payments() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethodToEdit, setPaymentMethodToEdit] = useState(null);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/paymentMethods');
      if (response.data.status === 200) {
        setPaymentMethods(response.data.metadata);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPaymentMethods = paymentMethods.filter((method) =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (method) => {
    setPaymentMethodToEdit(method);
    setIsModalOpen(true);
  };

  const handleUpdatePaymentMethod = async (updatedMethod) => {
    try {
      const response = await axiosInstance.put(
        `/api/paymentMethods/${updatedMethod.id}`,
        updatedMethod
      );
      if (response.status === 200) {
        setPaymentMethods((prevMethods) =>
          prevMethods.map((method) =>
            method.id === updatedMethod.id ? updatedMethod : method
          )
        );
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      setError('Error updating payment method');
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
              placeholder="Search for a payment method"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Payment Method Name</th>
                <th className="py-2">Description</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPaymentMethods.map((method) => (
                <tr key={method.id} className="border-b border-gray-700">
                  <td className=" py-2">{method.name}</td>
                  <td className="py-2">{method.description || 'N/A'}</td>
                  <td className="py-2">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => handleEditClick(method)}
                    >
                      Edit
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
      <EditPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paymentMethod={paymentMethodToEdit}
        onUpdate={handleUpdatePaymentMethod}
      />
    </Fragment>
  );
}
