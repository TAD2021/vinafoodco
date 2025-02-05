'use client';
import Aside from '@/components/Aside';
import axiosInstance from '@/utils/axiosInstance';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';

export default function GioiThieu() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/posts?page=1&limit=20&type=INTRODUCE'
        );
        setPosts(response.data?.metadata);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <main className="container mx-auto mt-6 px-6">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">GIỚI THIỆU</h2>
          <div className="space-y-6">
            {posts.map((post, index) => (
              <Link href={`/gioi-thieu/${post.slug}`}>
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded flex flex-col md:flex-row items-start"
                >
                  <Image
                    width={200}
                    height={200}
                    alt={`News Image ${index + 1}`}
                    className="w-full md:w-48 h-48 object-cover rounded mb-4 md:mb-0 md:mr-4"
                    src={post.thumbnail}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <CiCalendar />
                      <p className="ml-1">{formatDate(post.updatedAt)}</p>
                    </div>
                    <p className="text-gray-700 mt-2">{post.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Aside />
      </div>
    </main>
  );
}
