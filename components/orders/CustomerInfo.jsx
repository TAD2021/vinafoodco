'use client';
import { useEffect, useState } from 'react';

export default function CustomerInfo() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    // Lấy danh sách tỉnh thành từ API
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://provinces.open-api.vn/api/p');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    // Lấy danh sách quận huyện khi tỉnh thành được chọn
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
          const data = await response.json();
          setDistricts(data.districts);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      } else {
        setDistricts([]); // Reset districts if no province is selected
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    // Lấy danh sách phường xã khi quận huyện được chọn
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
          const data = await response.json();
          setWards(data.wards);
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      } else {
        setWards([]); // Reset wards if no district is selected
      }
    };

    fetchWards();
  }, [selectedDistrict]);

  return (
    <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow mb-4 lg:mb-0">
      <h2 className="text-lg font-bold mb-4">Thông Tin Mua Hàng</h2>
      <form>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Họ tên (*)"
            type="text"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Email (*)"
            type="email"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Số điện thoại (*)"
            type="text"
          />
        </div>
        <div className="mb-4">
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setDistricts([]); // Reset districts and wards when province changes
              setWards([]);
            }}
          >
            <option value="">Tỉnh / Thành Phố (*)</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setWards([]); // Reset wards when district changes
            }}
          >
            <option value="">Quận / Huyện (*)</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select className="w-full p-2 border rounded">
            <option value="">Phường / Xã (*)</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Địa chỉ (*)"
            type="text"
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Ghi chú"
          ></textarea>
        </div>
      </form>
    </div>
  );
}