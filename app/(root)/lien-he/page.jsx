export default function Lienhe() {
  return (
    <main className="container mx-auto mt-8 px-4 md:px-0">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-0 md:pr-4">
          <div className="border p-4">
            <iframe
              allowfullscreen=""
              height="450"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502407634073!2d106.660172315334!3d10.762622992332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee4d5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s28%20Ph%C3%BA%20Th%E1%BB%8D%2C%20Ph%C6%B0%E1%BB%9Dng%202%2C%20Qu%E1%BA%ADn%2011%2C%20TP.%20HCM!5e0!3m2!1sen!2s!4v1633023023023!5m2!1sen!2s"
              style={{ border: 0 }}
              width="100%"
            ></iframe>
          </div>
          <div className="mt-4 p-4">
            <h2 className="text-lg font-semibold">Liên hệ ngay để được tư vấn</h2>
            <p className="mt-2">
              <i className="fas fa-map-marker-alt"></i>
              28 Phú Thọ, Phường 2, Quận 11, TP. HCM
            </p>
            <p className="mt-2">
              <i className="fas fa-phone"></i>
              0977 608 680
            </p>
            <p className="mt-2">
              <i className="fas fa-envelope"></i>
              info@thuanhoafood.com
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 pl-0 md:pl-4 mt-8 md:mt-0">
          <div className="bg-gray-100 p-4">
            <h2 className="text-lg font-semibold">Form liên hệ</h2>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Họ tên *</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email *</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Số điện thoại *</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tin nhắn *</label>
                <textarea className="w-full p-2 border border-gray-300 rounded"></textarea>
              </div>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded"
                type="submit"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
