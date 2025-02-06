// components/ProductTags.js
'use client';

const ProductTags = ({ tags }) => {
  return (
    <div className="mt-4">
      <div className="flex items-center">
        <h2 className="font-semibold mr-2">Từ khoá:</h2>
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded mr-2 mb-2"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTags;
