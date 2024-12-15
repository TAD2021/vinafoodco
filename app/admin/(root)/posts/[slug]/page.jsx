'use client';

import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useSlug from '@/hooks/useSlug';
import axiosInstance from '@/utils/axiosInstance';

export default function UpdatePost() {
  const target = useSlug();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [type, setType] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (target) {
      // Lấy thông tin bài viết từ API
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get(`/api/posts/${target}`);
          const post = response.data?.metadata;
          setId(post.id);
          setTitle(post.title);
          setSlug(post.slug);
          setDescription(post.description);
          setContent(post.content);
          setThumbnail(post.thumbnail);
          setType(post.type);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [target]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !content || !thumbnail) {
      alert('All fields are required.');
      return;
    }

    const postData = {
      title,
      slug,
      description,
      content,
      thumbnail,
      type,
    };

    try {
      if (imageFile) {
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

        postData.thumbnail = uploadResponse.data.secure_url;
      }

      // Gửi dữ liệu đến API để cập nhật bài viết
      const response = await axios.put(`/api/posts/${id}`, postData);
      if (response.data.status === 200) {
        alert('Post updated successfully!');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center">
        <form
          className="bg-gray-800 p-8 rounded-lg w-full max-w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Update Post</h2>
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
          <div className="mb- 4">
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
            />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-600"
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
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update Post
          </button>
        </form>
      </div>
      <footer className="text-center mt-8">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
