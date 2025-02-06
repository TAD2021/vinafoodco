import Aside from '@/components/Aside';
import ProductDetail from '@/components/ProductDetail';

export default async function Sanpham() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:mr-6">
          <ProductDetail />
        </div>
        <Aside />
      </div>
    </main>
  );
}
