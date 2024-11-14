'use client';

import axiosInstance from '@/utils/axiosInstance';
import { Fragment, useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Định nghĩa ReactQuill từ thư viện
import 'react-quill/dist/quill.snow.css';

export default function Add() {
  const [attributes, setAttributes] = useState([
    { attributeName: '', attributeValues: [''], displayType: 'SINGLE_LINE' },
  ]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // Trạng thái để quản lý nhiều file hình ảnh
  const [imagePreviews, setImagePreviews] = useState([]); // Trạng thái để lưu trữ URL hình ảnh đã chọn
  const [tags, setTags] = useState([]); // Trạng thái để lưu trữ danh sách các tag
  const [selectedTags, setSelectedTags] = useState([]); // Trạng thái để lưu trữ các tag đã chọn
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories');
        if (response.data.status === 200) {
          setCategories(response.data.metadata);
          if (response.data.metadata.length > 0) {
            setSelectedCategory(response.data.metadata[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get('/api/tags'); // Thay đổi endpoint nếu cần
        if (response.data.status === 200) {
          setTags(response.data.metadata);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
    fetchCategories();
  }, []);

  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      { attributeName: '', attributeValues: [''], displayType: 'SINGLE_LINE' },
    ]);
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleValueChange = (attrIndex, valueIndex, value) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].attributeValues[valueIndex] = value;
    setAttributes(newAttributes);
  };

  const handleAddValue = (index) => {
    const newAttributes = [...attributes];
    newAttributes[index].attributeValues.push('');
    setAttributes(newAttributes);
  };

  const handleRemoveAttribute = (index) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Tạo URL cho từng file và lưu vào imagePreviews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    // Validate required fields
    if (!productName) {
      alert('Product name is required.');
      return;
    }

    if (!description) {
      alert('Description is required.');
      return;
    }

    if (!selectedCategory) {
      alert('Please select a category.');
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Please enter a valid price greater than 0.');
      return;
    }

    if (isNaN(parsedStock) || parsedStock < 0) {
      alert('Please enter a valid stock quantity (0 or more).');
      return;
    }

    // Format attributes
    const formattedAttributes = attributes.map((attr) => ({
      attributeName: attr.attributeName,
      attributeValues:
        attr.displayType === 'SINGLE_LINE'
          ? attr.attributeValues.slice(0, 1)
          : attr.attributeValues,
      displayType: attr.displayType,
    }));

    // Prepare the data to send
    const productData = {
      name: productName,
      description: description,
      price: parsedPrice,
      stock: parsedStock,
      categoryId: selectedCategory,
      attributes: formattedAttributes,
      tags: selectedTags, // Assuming selectedTags contains the IDs of the selected tags
      // Note: You can handle image uploads separately, as they typically require a different approach (e.g., FormData)
    };

    console.log('Product data to be sent:', productData);

    // Send the data to the API
    try {
      const response = await axiosInstance.post('/api/products', productData);
      if (response.data.status === 200) {
        alert('Product created successfully!');
        // Reset form if needed
        setProductName('');
        setDescription('');
        setPrice('');
        setStock('');
        setSelectedCategory('');
        setAttributes([
          {
            attributeName: '',
            attributeValues: [''],
            displayType: 'SINGLE_LINE',
          },
        ]);
        setImageFiles([]);
        setImagePreviews([]);
        setSelectedTags([]);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product.');
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center">
        <form
          className="bg-gray-800 p-8 rounded-lg w-full max-w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Product Name</label>
              <input
                className="w-full p-2 bg-gray-700 rounded"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">Category</label>
              <select
                className="w-full p-2 bg-gray-700 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Price</label>
              <input
                className="w-full p-2 bg-gray-700 rounded"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">Stock</label>
              <input
                className="w-full p-2 bg-gray-700 rounded"
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Description</label>
              <div className="bg-gray-700 rounded h-48">
                <ReactQuill
                  className="w-full h-full"
                  style={{ height: 'calc(100% - 40px)' }}
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block mb-4 text-lg font-semibold">
                Product Attributes
              </label>
              {attributes.map((attr, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg mb-4 bg-gray-800"
                >
                  <div className="flex space-x-2 mb-2">
                    <input
                      className="w-1/2 p-2 bg-gray-700 rounded"
                      type="text"
                      placeholder="Attribute Name"
                      value={attr.attributeName}
                      onChange={(e) =>
                        handleAttributeChange(
                          index,
                          'attributeName',
                          e.target.value
                        )
                      }
                    />
                    <select
                      className="w-1/2 p-2 bg-gray-700 rounded"
                      value={attr.displayType}
                      onChange={(e) =>
                        handleAttributeChange(
                          index,
                          'displayType',
                          e.target.value
                        )
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
                        onChange={(e) =>
                          handleValueChange(index, 0, e.target.value)
                        }
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
            <div className="col-span-2">
              <label className="block mb-2">Upload Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full p-2 bg-gray-700 rounded"
              />
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-600" // Điều chỉnh kích thước ảnh
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Select Tags</label>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    className={`mr-4 mb-2 px-4 py-2 rounded border transition-colors duration-300 
          ${
            selectedTags.includes(tag.id)
              ? 'bg-teal-600 text-white border-teal-600'
              : 'bg-gray-700 text-gray-300 border-gray-600'
          }
          hover:bg-teal-500 hover:text-white hover:border-teal-500`}
                    onClick={() => {
                      const value = tag.id;
                      setSelectedTags(
                        (prev) =>
                          prev.includes(value)
                            ? prev.filter((id) => id !== value) // Bỏ chọn tag
                            : [...prev, value] // Chọn tag
                      );
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-teal-600 p-3 rounded text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <footer className="text-center mt-8">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
