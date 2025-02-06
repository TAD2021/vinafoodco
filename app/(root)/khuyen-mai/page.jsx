'use client';

import MainLayout from '@/components/MainLayout';
import PostList from '@/components/PostList';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

export default function KhuyenMai() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/posts?page=1&limit=20&type=PROMOTION'
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
    <MainLayout>
      <div className="w-full lg:pr-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">KHUYẾN MÃI</h2>
        <PostList posts={posts} basePath="khuyen-mai" />
      </div>
    </MainLayout>
  );
}
