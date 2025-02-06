'use client';

import { SingleImageUpload } from '@/components/admin/SingleImageUpload';
import { InputText } from '@/components/admin/products/InputText';
import axiosInstance from '@/utils/axiosInstance';
import { Fragment, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { PostType } from '@prisma/client';

export default function AddPost() {
  const userId = useSelector((state) => state.auth.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [type, setType] = useState(PostType.INTRODUCE);

  const handleTitleChange = (title) => {
    setTitle(title);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title) {
      alert('Title is required.');
      return;
    }

    if (!content) {
      alert('Content is required.');
      return;
    }

    // Prepare the data to send
    const postData = {
      title,
      description,
      content,
      thumbnail,
      type,
      userId,
    };

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
        );
        const uploadResponse = await axiosInstance.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        postData.thumbnail = uploadResponse.data.secure_url;
      }

      // Send the data to the API
      const response = await axiosInstance.post('/api/posts', postData);
      if (response.data.status === 200) {
        alert('Post created successfully!');
        // Reset form if needed
        setTitle('');
        setDescription('');
        setContent('');
        setThumbnail('');
        setType('blog');
        setImageFile(null);
        setImagePreview('');
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
          <div className="grid grid-cols-2 gap-4">
            <InputText
              label="Title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
            <InputText
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="col-span-2">
              <label className="block mb-2">Content</label>
              <div className="bg-gray-700 rounded h-48">
                <ReactQuill
                  className="w-full h-full"
                  style={{ height: 'calc(100% - 40px)' }}
                  theme="snow"
                  value={content}
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
                  onChange={setContent}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Thumbnail</label>
              <SingleImageUpload
                onChange={handleImageUpload}
                imagePreview={imagePreview}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Type</label>
              <select
                className="bg-gray-700 text-gray-400 rounded p-2 w-full"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {Object.values(PostType).map((postType) => (
                  <option key={postType} value={postType}>
                    {postType.charAt(0) + postType.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
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
