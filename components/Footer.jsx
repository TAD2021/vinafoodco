import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white py-6 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-6 lg:mb-0 lg:w-1/4 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-bold mb-4 text-center lg:text-left">
              Giới thiệu
            </h3>
            <Link href="#">
              <span className="text-gray-600 block mb-2 text-center lg:text-left">
                Giới thiệu
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-600 block mb-2 text-center lg:text-left">
                Hệ thống quản lý
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-600 block mb-2 text-center lg:text-left">
                Tuyển dụng
              </span>
            </Link>
          </div>
          <div className="mb-6 lg:mb-0 lg:w-1/4 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-bold mb-4 text-center lg:text-left">
              Liên hệ
            </h3>
            <p className="text-gray-600 text-center lg:text-left">
              Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM
            </p>
            <p className="text-gray-600 text-center lg:text-left">
              Email: contact@thuanhoafood.com
            </p>
            <p className="text-gray-600 text-center lg:text-left">
              Điện thoại: 0123 456 789
            </p>
          </div>
          <div className="mb-6 lg:mb-0 lg:w-1/4 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-bold mb-4 text-center lg:text-left">
              Chính sách
            </h3>
            <Link href="#">
              <span className="text-gray-600 block mb-2 text-center lg:text-left">
                Chính sách bảo mật
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-600 block mb-2 text-center lg:text-left">
                Chính sách vận chuyển
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-600 block mb-2 text-center lg:text-left">
                Chính sách đổi trả
              </span>
            </Link>
          </div>
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center lg:text-left">
              Fanpage
            </h3>
            <Image
              alt="Fanpage Image"
              className="rounded-lg shadow-lg mb-2"
              src="https://storage.googleapis.com/a1aa/image/vLOpaLHkNfXpYyY4msSe2h7R1mjsh2R5epMDCC6iI5J1QRLnA.jpg"
              width={240}
              height={240}
            />
          </div>
        </div>
        <div className="mt-6 border-t pt-6 text-center text-gray-600">
          © Bản quyền thuộc về Vinafoodco
        </div>
      </div>
    </footer>
  );
}

export default Footer;
