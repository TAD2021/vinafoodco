'use client';

import LoadingIcon from '@/components/LoadingIcon';
import { ImageUpload } from '@/components/admin/products/ImageUpload';
import { InputText } from '@/components/admin/products/InputText';
import { ProductAttributes } from '@/components/admin/products/ProductAttributes';
import { SelectCategory } from '@/components/admin/products/SelectCategory';
import { TagSelection } from '@/components/admin/products/TagSection';
import useSlug from '@/hooks/useSlug';
import axiosInstance from '@/utils/axiosInstance';
import { Fragment, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import slugify from 'slugify';

export default function Update() {
  const target = useSlug(); // Giả sử đây là slug của sản phẩm cần cập nhật
  const userId = useSelector((state) => state.auth.id);
  const [attributes, setAttributes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${target}`);
        if (response.status === 200 || response.data.status === 200) {
          const product = response.data; // Dữ liệu sản phẩm nhận được

          // Thiết lập các giá trị mặc định từ dữ liệu sản phẩm
          setProductName(product.name);
          setSlug(slugify(product.name, { lower: true })); // Tạo slug từ tên sản phẩm
          setDescription(product.description);
          setPrice(product.price.toString());
          setStock(product.stock.toString());
          setImagePreviews(product.images); // Thiết lập hình ảnh hiện tại
          setSelectedCategory(product.category.id); // Thiết lập danh mục đã chọn
          setSelectedTags(product.tags.map((tag) => tag.id)); // Thiết lập thẻ đã chọn
          setImageFiles(product.images);

          // Nhóm thuộc tính cùng tên
          const groupedAttributes = product.attributes.reduce((acc, attr) => {
            const existing = acc.find(
              (item) => item.attributeName === attr.attributeName
            );
            if (existing) {
              existing.attributeValues.push(attr.attributeValue); // Thêm giá trị vào thuộc tính đã tồn tại
            } else {
              acc.push({
                attributeName: attr.attributeName,
                attributeValues: [attr.attributeValue],
                displayType: attr.displayType,
              });
            }
            return acc;
          }, []);

          setAttributes(groupedAttributes);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

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
        const response = await axiosInstance.get('/api/tags');
        if (response.data.status === 200) {
          setTags(response.data.metadata);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchProductData();
    fetchTags();
    fetchCategories();
  }, [target]);

  const handleProductNameChange = (name) => {
    setProductName(name);
    setSlug(slugify(name, { lower: true }));
  };

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
    setImageFiles((prevFiles) => [...prevFiles, ...files]); // Giữ lại hình ảnh cũ
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]); // Giữ lại hình ảnh cũ
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    const parsedCategoryId = parseInt(selectedCategory, 10);

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
      slug: slug,
      userId: userId,
      description: description,
      price: parsedPrice,
      stock: parsedStock,
      categoryId: parsedCategoryId,
      attributes: formattedAttributes,
      tags: selectedTags,
    };

    // Upload images to Cloudinary if new images are provided
    if (imageFiles.length > 0) {
      try {
        const uploadPromises = imageFiles.map((file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
          );
          return axiosInstance.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
        });

        const uploadResponses = await Promise.all(uploadPromises);
        const imageUrls = uploadResponses.map(
          (response) => response.data.secure_url
        );

        // Thêm URL hình ảnh vào dữ liệu sản phẩm
        productData.images = imageUrls;
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images.');
        return;
      }
    }

    // Gọi API cập nhật sản phẩm
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axiosInstance.patch(
        `/api/products/${target}`,
        productData
      );
      console.log(response);
      if (response.data.status === 200) {
        toast.success('Product updated successfully!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="flex justify-center">
        {loading && <LoadingIcon />}
        <form
          className="bg-gray-800 p-8 rounded-lg w-full max-w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <InputText
              label="Product Name"
              value={productName}
              onChange={(e) => handleProductNameChange(e.target.value)}
            />
            <SelectCategory
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <InputText
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputText
              label="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <div className="col-span-2">
              <label className="block mb-2">Description</label>
              <div className="bg-gray-700 rounded h-48">
                <ReactQuill
                  className="w-full h-full"
                  style={{ height: 'calc(100% - 40px)' }}
                  theme="snow"
                  value={description}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      [{ align: [] }],
                      ['link', 'image'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['clean'],
                    ],
                  }}
                  onChange={setDescription}
                />
              </div>
            </div>
            <ProductAttributes
              attributes={attributes}
              handleAttributeChange={handleAttributeChange}
              handleValueChange={handleValueChange}
              handleAddAttribute={handleAddAttribute}
              handleRemoveAttribute={handleRemoveAttribute}
              handleAddValue={handleAddValue}
            />
            <ImageUpload
              onChange={handleImageUpload}
              imagePreviews={imagePreviews}
              onRemoveImage={handleRemoveImage}
            />
            <TagSelection
              tags={tags}
              selectedTags={selectedTags}
              onTagClick={(tagId) => {
                setSelectedTags((prev) =>
                  prev.includes(tagId)
                    ? prev.filter((id) => id !== tagId)
                    : [...prev, tagId]
                );
              }}
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-teal-600 p-3 rounded text-white"
              type="submit"
              disabled={loading} // Vô hiệu hóa nút khi đang loading
            >
              {loading ? 'Updating...' : 'Submit'}
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
