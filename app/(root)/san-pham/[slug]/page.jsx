import Aside from '@/components/Aside';
import ProductDetail from '@/components/ProductDetail';

export default async function Sanpham() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <ProductDetail />
        <Aside />
      </div>
    </main>
  );
}
