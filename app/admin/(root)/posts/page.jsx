'use client';
import { DeleteModal } from '@/components/DeleteModal';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts');
        setPosts(response.data.metadata);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/posts/${postToDelete.id}`);
      setPosts(posts.filter((post) => post.id !== postToDelete.id));
      setIsModalOpen(false);
      setPostToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              className="bg-gray-800 text-gray-400 rounded-full pl-10 pr-4 py-2 w-full md:w-auto focus:outline-none"
              placeholder="Search for a post"
              type="text"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            Add New
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Title</th>
                <th className="py-2">Description</th>
                <th className="py-2">Thumbnail</th>
                <th className="py-2">Created at</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-700">
                  <td className="py-2">{post.title}</td>
                  <td className="py-2">{post.description}</td>
                  <td className="py-2">
                    <Image
                      alt="Post thumbnail"
                      className="w-10 h-10 rounded-full"
                      height={100}
                      src={post.thumbnail}
                      width={100}
                    />
                  </td>
                  <td className="py-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    <button className="bg-green-600 text-white px-2 py-1 rounded mr-2">
                      View
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteClick(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="text-center mt-4">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={postToDelete?.title}
        itemType="post"
      />
    </Fragment>
  );
}
