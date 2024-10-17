import Aside from "@/components/Aside";
import Image from "next/image";
import { CiCalendar, CiStar } from "react-icons/ci";
import {
  FaEye,
  FaFacebook,
  FaLinkedin,
  FaPinterestSquare,
  FaTwitter,
} from "react-icons/fa";

export default function Description() {
  return (
    <main className="container mx-auto mt-6 px-6">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-6">
          <div className=" bg-white rounded shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              6 SẢN PHẨM BỘT THUẬN HÒA ĐẠT OCOP 4 SAO VÀO NGÀY 6/9/2024
            </h2>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span className="mr-4 flex items-center">
                <CiCalendar className="mr-1" />
                09/09/2024
              </span>
              <span className="mr-4 flex items-center">
                <FaEye className="mr-1" />
                55
              </span>
              <span className="flex items-center">
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                Đánh giá
              </span>
            </div>
            <Image
              alt="Hội nghị đánh giá và xếp hạng sản phẩm OCOP"
              className="w-full mb-4"
              height="400"
              src="https://storage.googleapis.com/a1aa/image/xstACz8PTH5EGNt9BuLlIk05xeEwLCiUNJPMnhU5FheOTTmTA.jpg"
              width="800"
            />
            <p className="text-sm text-center text-gray-600 mb-4">
              Các đại biểu tham dự hội nghị
            </p>
            <p className="mb-4">
              Tại hội nghị, sau khi nghe các báo cáo, đánh giá và kết quả chấm
              điểm của Hội đồng đánh giá và xếp hạng sản phẩm OCOP cấp quận,
              huyện, các thành viên Hội đồng cấp thành phố đã tham gia đánh giá,
              thảo luận, góp ý để giúp các chủ thể hoàn thiện sản phẩm. Đồng
              thời, tiến hành chấm điểm, xếp hạng sao cho các sản phẩm.
            </p>
            <p className="mb-4">
              Kết quả, 6 sản phẩm của Cơ sở Thuận Hòa được Hội đồng OCOP thành
              phố chấm điểm đạt từ 80,5-81 điểm, đủ điều được xếp hạng sản phẩm
              OCOP 4 sao. Sản phẩm trà hòa tan dinh dưỡng Hằng Ngày của Công ty
              TNHH một thành viên Hygie &amp; Panacee đạt 92 điểm, trà hòa tan
              tốt cho Huyết áp đạt 94 điểm. 2 sản phẩm này được Hội đồng OCOP
              thành phố công nhận sản phẩm OCOP 4 sao và Hội đồng thành phố
              thống nhất sẽ làm hồ sơ gửi về Hội đồng OCOP Trung ương để đề nghị
              đánh giá, xếp hạng sản phẩm OCOP 5 sao cho 2 sản phẩm này. Riêng 6
              sản phẩm của huyện Cờ Đỏ, được Hội đồng OCOP thành phố đề nghị
              chỉnh sửa nhằm nâng mức độ bổ sung, hoàn thiện hồ sơ để đánh giá,
              xếp hạng đợt sau.
            </p>
            <p className="mb-4">Tin, ảnh: KHÁNH TRUNG</p>
            <p className="text-red-600 font-bold mb-4">
              GỌI NGAY: 0977 608 680 ĐỂ ĐƯỢC TƯ VẤN SẢN PHẨM PHÙ HỢP
            </p>
            <div className="border border-green-600 p-4 mb-4">
              <p className="font-bold">
                Thuận Hòa Food 40 năm cung cấp dinh dưỡng cho người Việt. Luôn
                đặt sức khỏe người tiêu dùng lên hàng đầu với sản phẩm chất
                lượng, giá thành hợp lý nhất.
              </p>
              <p className="text-sm">
                Sản phẩm đạt chứng nhận OCOP Quốc gia, nguồn nguyên liệu được
                tuyển chọn cẩn thận; quy trình sản xuất sạch, 100% thiên nhiên,
                không chất bảo quản.
              </p>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <span>Chia sẻ:</span>
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
              <FaPinterestSquare />
            </div>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-bold mb-4">(*) Xem thêm</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Thuận Hòa Food tài trợ in sách hướng dẫn nấu ăn</li>
                <li>
                  Thuận Hòa Food tổ chức tham gia các chương trình thiện nguyện
                  vì cộng đồng
                </li>
                <li>Nâng tầm sản phẩm OCOP Cần Thơ</li>
                <li>Xu hướng sử dụng sản phẩm thảo dược của dân gian</li>
                <li>
                  Hội nghị kết nối giao thương vùng Đồng Bằng Sông Cửu Long
                </li>
                <li>Thuận Hòa Food đạt chứng nhận OCOP quốc gia</li>
              </ul>
            </div>
            <div className="border-t border-gray-300 pt-4 mt-4">
              <h3 className="text-lg font-bold mb-4">BÌNH LUẬN</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" for="name">
                    Họ tên*
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2"
                    id="name"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" for="comment">
                    Bình luận*
                  </label>
                  <textarea
                    className="w-full border border-gray-300 p-2"
                    id="comment"
                  ></textarea>
                </div>
                <button
                  className="bg-green-600 text-white px-4 py-2"
                  type="submit"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
        <Aside />
      </div>
    </main>
  );
}
