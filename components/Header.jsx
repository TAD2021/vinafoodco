import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import Sidebar from "./sidebars/Sidebar";

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Sidebar />
        <div className="flex items-center">
          <img
            alt="Thuận Hòa Food Logo"
            className="h-10 w-auto md:h-12"
            src="https://storage.googleapis.com/a1aa/image/HfE5mbCkV6Q9fUxHClWc65vXUM3teCbPzSgihK1dlstkRRLnA.jpg"
          />
        </div>
        <nav className="flex items-center space-x-6">
          <div className="relative">
            <Link
              href="#"
              className="text-gray-700 hover:text-red-600 transition-colors duration-300"
            >
              <CiShoppingCart size={20} />
            </Link>
            <span className="absolute -top-1/2 left-1/2 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold text-center rounded-full">
              3
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
