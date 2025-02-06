'use client';

import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';

const PostList = ({ posts, basePath }) => {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <Link key={post.slug} href={`/${basePath}/${post.slug}`}>
          <div className="bg-white p-4 shadow rounded flex flex-col md:flex-row items-start mb-6">
            <Image
              width={200}
              height={200}
              alt={`News Image ${index + 1}`}
              className="w-full md:w-48 h-48 object-cover rounded mb-4 md:mb-0 md:mr-4"
              src={post.thumbnail}
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
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
  );
};

export default PostList;
