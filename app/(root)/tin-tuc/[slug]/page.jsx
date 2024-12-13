'use client';

import Aside from '@/components/Aside';
import CommentSection from '@/components/CommentSection';
import useSlug from '@/hooks/useSlug';
import axiosInstance from '@/utils/axiosInstance';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';
import { CiCalendar, CiStar } from 'react-icons/ci';

export default function PostDetail() {
  const slug = useSlug();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${slug}`);
        const data = response.data?.metadata;
        setPost(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPost();
  }, [slug]);

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
          <div className=" bg-white rounded shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span className="mr-4 flex items-center">
                <CiCalendar className="mr-1" />
                {formatDate(post.updatedAt)}
              </span>
              <span className="flex items-center">
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                Đánh giá
              </span>
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-bold mb-4">(*) Xem thêm</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Thuận Hòa Food tài trợ in sách hướng dẫn nấu ăn</li>
                <li>
                  Thuận Hòa Food tổ chức tham gia các chương trình thiện nguyện
                  vì cộng đồng
                </li>
                <li>Nâng tầm sản phẩm OCOP Cần Thơ</li>
                <li>Xu hướng sử dụng sản phẩm thảo dược của dân gian</li>
                <li>
                  Hội nghị kết nối giao thương vùng Đồng Bằng Sông Cửu Long
                </li>
                <li>Thuận Hòa Food đạt chứng nhận OCOP quốc gia</li>
              </ul>
            </div>
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
