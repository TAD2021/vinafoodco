'use client';

import LoadingIcon from '@/components/LoadingIcon';
import { InputText } from '@/components/admin/products/InputText';
import useSlug from '@/hooks/useSlug';
import axiosInstance from '@/utils/axiosInstance';
import { Fragment, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostType } from '@prisma/client';
import slugify from 'slugify';
import { SingleImageUpload } from '@/components/admin/SingleImageUpload';

export default function UpdatePost() {
  const target = useSlug(); // Giả sử đây là slug của bài viết cần cập nhật
  const userId = useSelector((state) => state.auth.id);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [type, setType] = useState(PostType.INTRODUCE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${target}`);
        if (response.status === 200 || response.data.status === 200) {
          const post = response.data?.metadata; // Dữ liệu bài viết nhận được

          // Thiết lập các giá trị mặc định từ dữ liệu bài viết
          setTitle(post.title);
          setSlug(slugify(post.title, { lower: true })); // Tạo slug từ tiêu đề bài viết
          setDescription(post.description);
          setContent(post.content);
          setThumbnail(post.thumbnail);
          setImagePreview(post.thumbnail); // Thiết lập hình ảnh hiện tại
          setType(post.type);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [target]);

  const handleTitleChange = (title) => {
    setTitle(title);
    setSlug(slugify(title, { lower: true }));
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

    // Upload image to Cloudinary if a new image is provided
    let thumbnailUrl = thumbnail;
    if (imageFile) {
      try {
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
        thumbnailUrl = uploadResponse.data.secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
        return;
      }
    }

    // Prepare the data to send
    const postData = {
      title: title,
      slug: slug,
      userId: userId,
      description: description,
      content: content,
      thumbnail: thumbnailUrl,
      type: type,
    };

    // Gọi API cập nhật bài viết
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axiosInstance.patch(
        `/api/posts/${target}`,
        postData
      );
      if (response.data.status === 200) {
        toast.success('Post updated successfully!');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post.');
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
              label="Title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
            <div className="col-span-2">
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full bg-gray-700 rounded p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
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
                className="w-full bg-gray-700 rounded p-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="INTRODUCE">Introduce</option>
                <option value="NEWS">News</option>
                <option value="PROMOTION">Promotion</option>
              </select>
            </div>
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
