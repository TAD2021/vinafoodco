"use client";

import Slider from "react-slick";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const NextArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l z-10"
      onClick={onClick}
    >
      <GrFormNext />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r z-10"
      onClick={onClick}
    >
      <GrFormPrevious />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            alt={`Slide ${index}`}
            className="w-full rounded-lg h-full object-cover"
            src={image}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
