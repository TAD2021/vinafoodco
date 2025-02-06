'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/formatCurrency';

const ProductSlider = ({ title, products }) => {
  const repeatedProducts = [...products];

  while (repeatedProducts.length < 6) {
    repeatedProducts.push(...products);
  }

  const displayProducts = repeatedProducts.slice(0, 6);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-center mb-4">
        {title.toUpperCase()}
      </h2>
      <Slider {...settings}>
        {displayProducts.map((product) => (
          <div key={product.id} className="p-4">
            <Link href={`/san-pham/${product.slug}`}>
              <article
                className="bg-white p-4 rounded-lg shadow h-80 flex flex-col justify-between"
                itemScope
                itemType="http://schema.org/Product"
              >
                <Image
                  alt={product.name}
                  width={160}
                  height={160}
                  className="w-auto h-40 rounded-lg mb-2 object-cover"
                  src={product.image || product.images[0].url}
                  loading="lazy" // Lazy loading
                />
                <div className="flex-grow">
                  <h3 className="text-center line-clamp-2" itemProp="name">
                    {product.name}
                  </h3>
                </div>
                <p
                  className="text-center text-yellow-500 font-bold"
                  itemProp="offers"
                  itemScope
                  itemType="http://schema.org/Offer"
                >
                  <span itemProp="price">{formatCurrency(product.price)}</span>
                </p>
              </article>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSlider;
