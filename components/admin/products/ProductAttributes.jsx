export const ProductAttributes = ({
  attributes,
  handleAttributeChange,
  handleValueChange,
  handleAddAttribute,
  handleRemoveAttribute,
  handleAddValue,
}) => {
  return (
    <div className="col-span-2">
      <label className="block mb-4 text-lg font-semibold">
        Product Attributes
      </label>
      {attributes.map((attr, index) => (
        <div key={index} className="border p-4 rounded-lg mb-4 bg-gray-800">
          <div className="flex space-x-2 mb-2">
            <input
              className="w-1/2 p-2 bg-gray-700 rounded"
              type="text"
              placeholder="Attribute Name"
              value={attr.attributeName}
              onChange={(e) =>
                handleAttributeChange(index, 'attributeName', e.target.value)
              }
            />
            <select
              className="w-1/2 p-2 bg-gray-700 rounded"
              value={attr.displayType}
              onChange={(e) =>
                handleAttributeChange(index, 'displayType', e.target.value)
              }
            >
              <option value="SINGLE_LINE">Single Line</option>
              <option value="LIST">List</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            {attr.displayType === 'SINGLE_LINE' ? (
              <input
                className="w-full p-2 bg-gray-700 rounded"
                type="text"
                placeholder="Attribute Value"
                value={attr.attributeValues[0]}
                onChange={(e) => handleValueChange(index, 0, e.target.value)}
              />
            ) : (
              attr.attributeValues.map((value, valueIndex) => (
                <input
                  key={valueIndex}
                  className="w-full p-2 bg-gray-700 rounded"
                  type="text"
                  placeholder="Attribute Value"
                  value={value}
                  onChange={(e) =>
                    handleValueChange(index, valueIndex, e.target.value)
                  }
                />
              ))
            )}
            {attr.displayType === 'LIST' && (
              <button
                type="button"
                className="mt-2 p-2 bg-teal-600 text-white rounded"
                onClick={() => handleAddValue(index)}
              >
                + Add Value
              </button>
            )}
          </div>
          {attributes.length > 1 && (
            <button
              type="button"
              className="mt-2 text-red-600"
              onClick={() => handleRemoveAttribute(index)}
            >
              - Remove Attribute
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="mt-2 p-2 bg-teal-600 text-white rounded"
        onClick={handleAddAttribute}
      >
        + Add Attribute
      </button>
    </div>
  );
};
