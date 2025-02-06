import Aside from '@/components/Aside';

const MainLayout = ({ children }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:mr-6">{children}</div>
        <Aside />
      </div>
    </main>
  );
};

export default MainLayout;
