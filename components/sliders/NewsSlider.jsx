'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiCalendar } from 'react-icons/ci';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';

const typeToPathMap = {
  INTRODUCE: 'gioi-thieu',
  NEWS: 'tin-tuc',
  PROMOTION: 'khuyen-mai',
};

const NewsSlider = ({ title, newsItems }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust this to fit your layout
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
      <Slider {...settings}>
        {newsItems.map((news, index) => {
          const path = typeToPathMap[news.type] || 'tin-tuc'; // Mặc định về "tin-tuc" nếu không có
          return (
            <div key={index} className="p-4">
              <Link href={`/${path}/${news.slug}`}>
                <article className="bg-white p-4 rounded-lg shadow h-full flex flex-col justify-between">
                  <div>
                    <Image
                      alt={`News Image ${index + 1}`}
                      width={160}
                      height={160}
                      className="w-full rounded-lg mb-2 object-cover h-40"
                      src={news.thumbnail}
                    />
                    <h3 className="text-lg font-bold mb-2">{news.title}</h3>
                    <div className="text-gray-500 text-xs flex items-center mb-2">
                      <CiCalendar />
                      <span className="ml-1">{formatDate(news.createdAt)}</span>
                    </div>
                  </div>
                  <p
                    className="text-gray-600 text-sm flex-grow overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {news.description}
                  </p>
                </article>
              </Link>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default NewsSlider;
