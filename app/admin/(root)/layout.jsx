'use client';

import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { useState } from 'react';
import '../../globals.css';
import { usePathname } from 'next/navigation';

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
    switch (pathname) {
      case '/admin':
        return 'Dashboard';
      case '/admin/users':
        return 'Users';
      case '/admin/products':
        return 'Products';
      case '/admin/transactions':
        return 'Transactions';
      case '/admin/revenue':
        return 'Revenue';
      case '/admin/reports':
        return 'Reports';
      case '/admin/teams':
        return 'Teams';
      case '/admin/settings':
        return 'Settings';
      case '/admin/help':
        return 'Help';
      case '/admin/logout':
        return 'Logout';
      default:
        return 'Dashboard';
    }
  };

  // Render the component only on the client side
  return (
    <html lang="en">
      <body className={`bg-gray-900 text-white ${inter.className}`}>
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
            ></div>
          )}
        </div>
      </body>
    </html>
  );
}