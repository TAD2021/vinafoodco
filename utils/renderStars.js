import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa'; // Import FaStar

export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="mr-1 text-yellow-500" /> // Sử dụng FaStar cho ngôi sao vàng
      ) : (
        <CiStar key={i} className="mr-1 text-gray-300" /> // Sử dụng CiStar cho ngôi sao xám
      )
    );
  }
  return stars;
};
