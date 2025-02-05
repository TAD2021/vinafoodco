'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '@/utils/axiosInstance';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { DeleteModal } from '@/components/DeleteModal';
import LoadingIcon from '@/components/LoadingIcon';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts?page=1&limit=5');
        setPosts(response.data?.metadata);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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

  if (loading) return <LoadingIcon />;
  if (error) return <div>Error: {error}</div>;

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
          <Link href="posts/add">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              Add New
            </button>
          </Link>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Title</th>
                <th className="py-2">Type</th>
                <th className="py-2">Created at</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-700">
                  <td className="py-2 flex items-center">
                    <Image
                      alt="Post thumbnail"
                      className="w-10 h-10 rounded-full mr-2"
                      height={100}
                      src={
                        post.thumbnail ||
                        'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                      }
                      width={100}
                    />
                    {post.title}
                  </td>
                  <td className="py-2">{post.type}</td>
                  <td className="py-2">{formatDate(post.updatedAt)}</td>
                  <td className="py-2">
                    <Link href={`posts/${post.slug}`}>
                      <button className="bg-green-600 text-white px-2 py-1 rounded mr-2">
                        View
                      </button>
                    </Link>
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
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-gray-700 text-gray-400 px-4 py-2 rounded"
              disabled=""
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={postToDelete?.title}
        itemType="post"
      />
    </Fragment>
  );
}
