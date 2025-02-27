'use client'

import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import Sidebar from "./sidebars/Sidebar";
import Image from "next/image";
import { useSelector } from 'react-redux';

function Header() {
  const cart = useSelector((state) => state.cart);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Sidebar />
        <div className="flex items-center">
          <Image
            alt="Thuận Hòa Food Logo"
            className="w-auto md:h-12"
            src="https://storage.googleapis.com/a1aa/image/HfE5mbCkV6Q9fUxHClWc65vXUM3teCbPzSgihK1dlstkRRLnA.jpg"
            width={40}
            height={40}
          />
        </div>
        <nav className="flex items-center space-x-6">
          <div className="relative">
            <Link
              href="/cart"
              className="text-gray-700 hover:text-red-600 transition-colors duration-300"
            >
              <CiShoppingCart size={20} />
            </Link>
            <span className="absolute -top-1/2 left-1/2 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold text-center rounded-full">
              {cart.items.length}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;