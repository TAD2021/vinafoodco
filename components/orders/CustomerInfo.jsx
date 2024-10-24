import { useEffect, useState } from 'react';

export default function CustomerInfo({ setCustomerInfo }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    const province = provinces.find(p => p.code == provinceCode);
    
    setSelectedProvince(provinceCode);
    setDistricts([]); // Reset districts and wards when province changes
    setWards([]);
    setCustomerInfo(prev => ({ ...prev, province: province.name }));
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    const district = districts.find(d => d.code == districtCode);

    setSelectedDistrict(districtCode);
    setWards([]); // Reset wards when district changes
    setCustomerInfo(prev => ({ ...prev, district: district.name }));
  };

  const handleWardChange = (e) => {
    const wardCode = e.target.value;
    const ward = wards.find(w => w.code == wardCode);
    console.log(wardCode, wards)

    setSelectedWard(wardCode);
    setCustomerInfo(prev => ({ ...prev, ward: ward.name }));
  };

  useEffect(() => {
    // Fetch provinces
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
    // Fetch districts
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
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    // Fetch wards
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
        setWards([]);
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
            name='name'
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Email (*)"
            type="email"
            name='email'
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Số điện thoại (*)"
            type="text"
            name='phone'
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <select
            className="w-full p-2 border rounded"
            onChange={handleProvinceChange}
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
            onChange={handleDistrictChange}
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
          <select
            className="w-full p-2 border rounded"
            onChange={handleWardChange}
          >
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
            name='address'
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Ghi chú"
            name='note'
            onChange={handleInputChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}