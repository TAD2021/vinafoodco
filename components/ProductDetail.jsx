'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaCartPlus,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaShoppingBasket,
  FaTwitter,
} from 'react-icons/fa';
import ImageGallery from './ImageGallery';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from './Button';
import CommentSection from './CommentSection';
import useSlug from '@/hooks/useSlug';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import axiosInstance from '@/utils/axiosInstance';
import ProductSlider from './sliders/ProductSlider'; // Đảm bảo bạn đã import ProductSlider

function ProductDetail() {
  const slug = useSlug();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${slug}`);
        const data = await response.data;
        setProduct(data);
        await fetchSimilarProducts(data.tags); // Gọi fetchSimilarProducts với tags của sản phẩm
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const fetchSimilarProducts = async (tags) => {
    try {
      const response = await axiosInstance.get(
        `/api/products/similar?slug=${slug}`
      );
      setSimilarProducts(response.data?.metadata);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
      })
    );
    console.log('Thêm vào giỏ hàng:', { ...product, quantity });
  };

  const handleBuyNow = () => {
    console.log('Mua ngay:', { ...product, quantity });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const organizedAttributes = product.attributes.reduce((acc, attribute) => {
    const { attributeName, attributeValue, displayType } = attribute;

    if (!acc[attributeName]) {
      acc[attributeName] = { displayType, values: [] };
    }
    acc[attributeName].values.push(attributeValue);
    return acc;
  }, {});

  return (
    <div className="w-full lg:w-3/4 lg:mr-6">
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <ImageGallery images={product.images} />
          </div>
          <div className="w-full md:w-2/3 md:pl-4 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-green-600 text-xl font-semibold">
              {formatCurrency(product.price)}
            </p>
            {Object.entries(organizedAttributes).map(
              ([attributeName, { displayType, values }]) => {
                if (displayType === 'SINGLE_LINE') {
                  return (
                    <div key={attributeName}>
                      <p className="mt-2">
                        <strong>{attributeName}:</strong> {values[0]}
                      </p>
                    </div>
                  );
                }

                if (displayType === 'LIST') {
                  return (
                    <div key={attributeName}>
                      <p className="mt-2">
                        <strong>{attributeName}:</strong>
                      </p>
                      <ul className="list-disc list-inside">
                        {values.map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
              }
            )}
            <div className="mt-4">
              <p>
                <strong>Tình trạng:</strong> Còn hàng
              </p>
              <div className="flex items-center mt-2">
                <span className="mr-2">Số lượng:</span>
                <button className="px-2" onClick={decreaseQuantity}>
                  -
                </button>
                <input
                  className="w-8 text-center border-l border-r"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <button className="px-2" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <div className="flex space-x-4 mt-4">
                <Button
                  label="Thêm vào giỏ hàng"
                  icon={FaCartPlus}
                  onClick={handleAddToCart}
                  className="bg-green-500"
                />
                <Button
                  label="Mua ngay"
                  icon={FaShoppingBasket}
                  onClick={handleBuyNow}
                  className="bg-green-700"
                />
              </div>
            </div>
            {product.tags && product.tags.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center">
                  <h2 className="font-semibold mr-2">Từ khoá:</h2>
                  <div className="flex flex-wrap">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded mr-2 mb-2"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
          </div>
        </div>
        {product.description && (
          <div className="mt-8">
            <h2 className="text-xl font-bold">Mô tả</h2>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>
      {similarProducts.length > 0 && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <ProductSlider title="SẢN PHẨM Tương Tự" products={similarProducts} />
        </div>
      )}
      <div className="bg-white rounded shadow p-6">
        <CommentSection slug={slug} type="product" />
      </div>
    </div>
  );
}

export default ProductDetail;
