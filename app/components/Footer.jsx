import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white mt-6">
      <div className="container mx-auto py-10 px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-10">
          <div className="flex items-center mb-6 md:mb-0 md:flex-1">
            <img
              alt="Thuận Hòa Food Logo"
              className="h-24 w-auto md:h-28"
              src="https://storage.googleapis.com/a1aa/image/HfE5mbCkV6Q9fUxHClWc65vXUM3teCbPzSgihK1dlstkRRLnA.jpg"
            />
            <p className="ml-6 text-gray-800 max-w-lg text-base md:text-lg leading-relaxed">
              <strong>Thuận Hòa Food</strong> hơn 40 năm kinh nghiệm chuyên sản
              xuất và phân phối các loại Bột Ngũ Cốc Dinh Dưỡng và Trà Thực
              Dưỡng, đạt chứng nhận OCOP Quốc gia. Sản phẩm 100% thiên nhiên,
              không chất bảo quản, nguồn nguyên liệu được tuyển chọn cẩn thận.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              className="text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
              href="#"
            >
              <i className="fab fa-facebook-f text-3xl"></i>
            </Link>
            <Link
              className="text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
              href="#"
            >
              <i className="fab fa-instagram text-3xl"></i>
            </Link>
            <Link
              className="text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
              href="#"
            >
              <i className="fab fa-twitter text-3xl"></i>
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              LIÊN HỆ
            </h3>
            <p className="text-gray-700">Thuận Hòa Food</p>
            <p className="text-gray-700">
              Địa chỉ: 123 Phan Đình Phùng, Tân An, Ninh Kiều, TP. Cần Thơ
            </p>
            <p className="text-gray-700">Email: thuanhoafood@gmail.com</p>
            <p className="text-gray-700">
              Điện thoại: 0977 050 080 - 0939 56 20 20
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              CHÍNH SÁCH
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  href="#"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  href="#"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  href="#"
                >
                  Chính sách đổi trả
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              FANPAGE
            </h3>
            <img
              alt=" Fanpage Image"
              className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-lg mb-2"
              src="https://storage.googleapis.com/a1aa/image/vLOpaLHkNfXpYyY4msSe2h7R1mjsh2R5epMDCC6iI5J1QRLnA.jpg"
            />
          </div>
        </div>
      </div>
      <div className="bg-green-600 py-2">
        <div className="container mx-auto text-center text-white">
          <p>© Bản quyền thuộc về Thuận Hòa Food</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
