'use client';

import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { useState } from 'react';
import '../../globals.css';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ReduxProvider } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setIsOpen(false);
    }
  };

  // Determine the title based on the pathname
  const getTitle = () => {
    const titles = {
      '/admin/dashboard': 'Dashboard',
      '/admin/users': 'Users',
      '/admin/products': 'Products',
      '/admin/transactions': 'Transactions',
      '/admin/tags': 'Tags',
      '/admin/categories': 'Categories',
      '/admin/payments': 'Payments',
      '/admin/posts': 'Posts',
      '/admin/help': 'Help',
    };
    return titles[pathname] || 'Dashboard';
  };

  return (
    <html lang="en">
      <body className={`bg-gray-900 text-white ${inter.className}`}>
        <ReduxProvider>
          <ProtectedRoute>
            <div className="flex flex-col md:flex-row">
              <Sidebar
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                currentPath={pathname}
              />
              <div className={`w-full md:w-4/5 p-6 ml-auto`}>
                <Header toggleSidebar={toggleSidebar} title={getTitle()} />
                {children}
              </div>
              {isOpen && (
                <div
                  className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 backdrop"
                  onClick={handleBackdropClick}
                  role="button"
                  aria-label="Close sidebar"
                ></div>
              )}
            </div>
          </ProtectedRoute>
        </ReduxProvider>
      </body>
    </html>
  );
}
