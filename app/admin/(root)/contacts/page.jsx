'use client';

import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { DeleteModal } from '@/components/DeleteModal';
import axiosInstance from '@/utils/axiosInstance';
import LoadingIcon from '@/components/LoadingIcon';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/contacts'); // API để lấy danh sách liên hệ
      if (response.data.status === 200) {
        setContacts(response.data?.metadata?.contacts);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/contacts/${contactToDelete.id}`); // API để xóa liên hệ
      setContacts(
        contacts.filter((contact) => contact.id !== contactToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setContactToDelete(null);
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
              placeholder="Search for a contact"
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
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone Number</th>
                <th className="py-2">Message</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-700">
                  <td className="py-2">{contact.name}</td>
                  <td className="py-2">{contact.email}</td>
                  <td className="py-2">{contact.phoneNumber}</td>
                  <td className="py-2">{contact.message}</td>
                  <td className="py-2">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteClick(contact)}
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
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={contactToDelete?.name}
        itemType="contact"
      />
    </Fragment>
  );
}
