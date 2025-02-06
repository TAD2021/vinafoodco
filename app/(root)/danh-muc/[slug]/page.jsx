'use client';
import Aside from '@/components/Aside';
import useSlug from '@/hooks/useSlug';
import axiosInstance from '@/utils/axiosInstance';
import { formatCurrency } from '@/utils/formatCurrency';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Nhập component Image từ next/image

export default function DanhMuc() {
  const slug = useSlug();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(`/api/products-by-category/${slug}`);
      const data = await res.data?.metadata;
      setProducts(data.products);
      setCategoryName(data.categoryName);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [slug]);

  return (
    <main className="container mx-auto mt-6 px-6">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="p-4">
                <Link href={`/san-pham/${product.slug}`}>
                  <article className="bg-white p-4 rounded-lg shadow h-80 flex flex-col justify-between">
                    <Image
                      alt={product.name}
                      width={160}
                      height={160}
                      className="w-auto h-40 rounded-lg mb-2 object-cover"
                      src={
                        product.images.length > 0
                          ? product.images[0].url
                          : '/default-image.png'
                      } // Sử dụng hình ảnh mặc định nếu không có hình
                    />
                    <div className="flex-grow">
                      <h3 className="text-center line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-center text-gray-700 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-center text-yellow-500 font-bold">
                      {formatCurrency(product.price)}
                    </p>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Aside />
      </div>
    </main>
  );
}
