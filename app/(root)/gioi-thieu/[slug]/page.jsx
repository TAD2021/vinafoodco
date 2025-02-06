'use client';

import Aside from '@/components/Aside';
import CommentSection from '@/components/CommentSection';
import useSlug from '@/hooks/useSlug';
import axiosInstance from '@/utils/axiosInstance';
import { formatDate } from '@/utils/formatDate';
import { renderStars } from '@/utils/renderStars';
import { useEffect, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';

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

        // Gọi fetchRating sau khi post đã được lấy thành công
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

  if (!post) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="container mx-auto mt-6 px-6">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-6">
          <div className="bg-white rounded shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span className="mr-4 flex items-center">
                <CiCalendar className="mr-1" />
                {formatDate(post.updatedAt)}
              </span>
              <span className="flex items-center">{renderStars(rating)}</span>
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="border-t border-gray-300 pt-4 mt-4">
              <CommentSection slug={slug} type="post" />
            </div>
          </div>
        </div>
        <Aside />
      </div>
    </main>
  );
}
