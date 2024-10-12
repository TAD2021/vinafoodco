"use client";
import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <img
        alt={`Slide ${currentIndex}`}
        className="w-full rounded-lg h-full object-cover"
        src={images[currentIndex]}
      />
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r"
      >
        <GrFormPrevious />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l"
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default ImageSlider;
