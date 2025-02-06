'use client';

import MainLayout from '@/components/MainLayout';
import DetailTemplate from '@/components/DetailTemplate';
import useSlug from '@/hooks/useSlug';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const slug = useSlug();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/api/posts/${slug}`);
        const data = await res.data?.metadata;
        setPost(data);

        if (data && data.id) {
          await fetchRating(data.id);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPost();
  }, [slug]);

  const fetchRating = async (postId) => {
    try {
      const res = await axiosInstance.get(`/api/rating?postId=${postId}`);
      const data = await res.data?.metadata;
      setRating(data.averageRating);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MainLayout>
      <DetailTemplate
        data={post}
        type="post"
        rating={rating}
        fetchRating={fetchRating}
      />
    </MainLayout>
  );
}
