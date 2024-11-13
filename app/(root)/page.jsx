import ProductSlider from '../../components/sliders/ProductSlider';
import ImageSlider from '../../components/sliders/ImageSlider';
import NewsSlider from '../../components/sliders/NewsSlider';
import { Fragment } from 'react';
import axiosInstance from '@/utils/axiosInstance';

const Home = async () => {
  const productsResponse = await axiosInstance.get('/api/products');
  const postsResponse = await axiosInstance.get('/api/posts');

  // Extract data from the responses
  const products = productsResponse.data;
  const posts = postsResponse.data;

  const images = [
    'https://i.pinimg.com/564x/3c/7c/08/3c7c08fcdd19c3ce36dff50fd414d775.jpg',
    'https://i.pinimg.com/564x/f7/aa/fb/f7aafbee1aa1f8f34802f00a12f0089d.jpg',
  ];

  return (
    <Fragment>
      <div className="container mx-auto flex flex-wrap px-6">
        <aside className="lg:w-1/4 lg:block p-4 hidden">
          <h2 className="text-lg font-bold mb-4"></h2>
          <ul className="space-y-2"></ul>
        </aside>
        <div className="lg:w-3/4 p-4 w-full">
          <ImageSlider images={images} />
        </div>
      </div>
      <div className="container mx-auto flex">
        <main className="w-full p-4">
          {Object.keys(products).map((category) => (
            <ProductSlider
              key={category}
              title={category}
              products={products[category]}
            />
          ))}
          <NewsSlider title="TIN TỨC" newsItems={posts} />
        </main>
      </div>
    </Fragment>
  );
};

export default Home;
