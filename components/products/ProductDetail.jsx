'use client';

import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery';
import ProductInfo from './ProductInfo';
import ProductTags from './ProductTags';
import ProductSocialShare from './ProductSocialShare';
import CommentSection from '../CommentSection';
import useSlug from '@/hooks/useSlug';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import axiosInstance from '@/utils/axiosInstance';
import ProductSlider from '../sliders/ProductSlider';

function ProductDetail() {
  const slug = useSlug();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productResponse, similarProductsResponse] = await Promise.all([
          axiosInstance.get(`/api/products/${slug}`),
          axiosInstance.get(`/api/products/similar?slug=${slug}`),
        ]);

        setProduct(productResponse.data);
        setSimilarProducts(similarProductsResponse.data?.metadata);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
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
    }
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

  return (
    <>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <ImageGallery images={product.images} />
          </div>
          <ProductInfo
            product={product}
            quantity={quantity}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>
        {product.tags && product.tags.length > 0 && (
          <ProductTags tags={product.tags} />
        )}
        <ProductSocialShare />
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
    </>
  );
}

export default ProductDetail;
