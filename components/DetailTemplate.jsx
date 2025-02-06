'use client';

import CommentSection from '@/components/CommentSection';
import { formatDate } from '@/utils/formatDate';
import { renderStars } from '@/utils/renderStars';
import { CiCalendar } from 'react-icons/ci';

const DetailTemplate = ({ data, type, rating, fetchRating }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="mr-4 flex items-center">
          <CiCalendar className="mr-1" />
          {formatDate(data.updatedAt)}
        </span>
        <span className="flex items-center">{renderStars(rating)}</span>
      </div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      <div className="border-t border-gray-300 pt-4 mt-4">
        <CommentSection slug={data.slug} type={type} />
      </div>
    </div>
  );
};

export default DetailTemplate;
