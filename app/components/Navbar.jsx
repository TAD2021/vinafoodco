import Category from "./Category";

function Navbar() {
  return (
    <nav className="bg-green-600 lg:block hidden">
      <div className="container mx-auto flex justify-between items-center px-6">
        <ul className="flex space-x-4 text-white">
          <li className="flex items-center">
            <Category />
          </li>
          <li className="flex items-center">
            <a href="#" className="hover:text-gray-200 transition duration-300">
              TRANG CHỦ
            </a>
          </li>
          <li className="flex items-center">
            <a href="#" className="hover:text-gray-200 transition duration-300">
              GIỚI THIỆU
            </a>
          </li>
          <li className="flex items-center">
            <a href="#" className="hover:text-gray-200 transition duration-300">
              TIN TỨC
            </a>
          </li>
          <li className="flex items-center">
            <a href="#" className="hover:text-gray-200 transition duration-300">
              CHÍNH SÁCH
            </a>
          </li>
          <li className="flex items-center">
            <a href="#" className="hover:text-gray-200 transition duration-300">
              KHUYẾN MÃI
            </a>
          </li>
          <li className="flex items-center">
            <a href="#" className="hover:text-gray-200 transition duration-300">
              LIÊN HỆ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
