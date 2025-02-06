// components/ProductSocialShare.js
'use client';

import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterest,
} from 'react-icons/fa';

const ProductSocialShare = () => {
  return (
    <div className="mt-4">
      <div className="flex">
        <span className="mr-2">Chia sẻ:</span>
        <Link className="text-gray-600" href="#">
          <FaFacebookF />
        </Link>
        <Link className="text-gray-600 ml-2" href="#">
          <FaTwitter />
        </Link>
        <Link className="text-gray-600 ml-2" href="#">
          <FaLinkedinIn />
        </Link>
        <Link className="text-gray-600 ml-2" href="#">
          <FaPinterest />
        </Link>
      </div>
    </div>
  );
};

export default ProductSocialShare;
