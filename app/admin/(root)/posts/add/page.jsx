'use client';

import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import slugify from 'slugify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [type, setType] = useState(''); // Có thể là 'blog', 'news', v.v.
  const [imageFile, setImageFile] = useState(null); // State cho thumbnail

  useEffect(() => {
    setSlug(slugify(title, { lower: true })); // Tạo slug từ tiêu đề
  }, [title]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result); // Lưu URL hình ảnh vào state
      };
      reader.readAsDataURL(file); // Đọc file và tạo URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !description || !content || !thumbnail) {
      alert('All fields are required.');
      return;
    }

    // Prepare the data to send
    const postData = {
      title,
      slug,
      description,
      content,
      thumbnail,
      type,
    };

    // Upload thumbnail to Cloudinary
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
      );

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      // Lưu URL thumbnail vào postData
      postData.thumbnail = uploadResponse.data.secure_url;

      // Gửi dữ liệu đến API
      const response = await axios.post('/api/posts', postData);
      if (response.data.status === 200) {
        alert('Post created successfully!');
        // Reset form if needed
        setTitle('');
        setSlug('');
        setDescription('');
        setContent('');
        setThumbnail('');
        setType('');
        setImageFile(null);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center">
        <form
          className="bg-gray-800 p-8 rounded-lg w-full max-w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Add New Post</h2>
          <div className="mb-4">
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-48"
            />
          </div>
          <div className="mb-4 mt-14">
            <label className="block text-white mb-2">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail Preview"
                className="mt-2 w-full h-auto"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Select Type</option>
              <option value="tin-tuc">Tin tức</option>
              <option value="gioi-thieu">Giới thiệu</option>
              {/* Add more types as needed */}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Post
          </button>
        </form>
      </div>
      <footer className="text-center mt-8">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
