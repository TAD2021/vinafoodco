import { createUploadthing } from 'uploadthing/next-legacy';

const uploadthing = createUploadthing();

export const OurFileRouter = uploadthing({
  image: {
    maxFileSize: '4mb', // Kích thước tối đa
    maxFileCount: 5, // Số lượng file tối đa
  },
});
