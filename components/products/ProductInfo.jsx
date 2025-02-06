'use client';

import { formatCurrency } from '@/utils/formatCurrency';
import Button from '../Button';
import { FaCartPlus, FaShoppingBasket } from 'react-icons/fa';

const ProductInfo = ({
  product,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onAddToCart,
  onBuyNow,
}) => {
  const organizedAttributes = product.attributes.reduce((acc, attribute) => {
    const { attributeName, attributeValue, displayType } = attribute;

    if (!acc[attributeName]) {
      acc[attributeName] = { displayType, values: [] };
    }
    acc[attributeName].values.push(attributeValue);
    return acc;
  }, {});

  return (
    <div className="w-full md:w-2/3 md:pl-4 mt-4 md:mt-0">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-green-600 text-xl font-semibold">
        {formatCurrency(product.price)}
      </p>
      {Object.entries(organizedAttributes).map(
        ([attributeName, { displayType, values }]) => {
          if (displayType === 'SINGLE_LINE') {
            return (
              <div key={attributeName}>
                <p className="mt-2">
                  <strong>{attributeName}:</strong> {values[0]}
                </p>
              </div>
            );
          }

          if (displayType === 'LIST') {
            return (
              <div key={attributeName}>
                <p className="mt-2">
                  <strong>{attributeName}:</strong>
                </p>
                <ul className="list-disc list-inside">
                  {values.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            );
          }
        }
      )}
      <div className="mt-4">
        <p>
          <strong>Tình trạng:</strong> Còn hàng
        </p>
        <div className="flex items-center mt-2">
          <span className="mr-2">Số lượng:</span>
          <button className="px-2" onClick={onDecreaseQuantity}>
            -
          </button>
          <input
            className="w-8 text-center border-l border-r"
            type="text"
            value={quantity}
            readOnly
          />
          <button className="px-2" onClick={onIncreaseQuantity}>
            +
          </button>
        </div>
        <div className="flex space-x-4 mt-4">
          <Button
            label="Thêm vào giỏ hàng"
            icon={FaCartPlus}
            onClick={onAddToCart}
            className="bg-green-500"
          />
          <Button
            label="Mua ngay"
            icon={FaShoppingBasket}
            onClick={onBuyNow}
            className="bg-green-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
