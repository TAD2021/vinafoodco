"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ProductSlider = ({ title, products, children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default number of slides to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280, // Extra large screens
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
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
        {products.map((product, index) => (
          <div key={index} className="p-4">
            <article className="bg-white p-4 rounded-lg shadow h-80 flex flex-col justify-between">
              <Image
                alt={product.title}
                width={160}
                height={160}
                className="w-full rounded-lg mb-2 object-cover h-40"
                src={product.imgSrc}
              />
              <div className="flex-grow">
                <h3 className="text-center">{product.title}</h3>
              </div>
              <p className="text-center text-yellow-500 font-bold">
                {product.price}
              </p>
            </article>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSlider;
