import { IoMdCloseCircle } from 'react-icons/io';

export const ImageUpload = ({ onChange, imagePreviews, onRemoveImage }) => {
  return (
    <div className="col-span-2">
      <label className="block mb-2">Upload Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        className="w-full p-2 bg-gray-700 rounded"
      />
      {imagePreviews.length > 0 && (
        <div className="mt-4 flex overflow-x-auto space-x-2">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg border border-gray-600"
              />
              <IoMdCloseCircle
                size={24} // Tăng kích thước biểu tượng
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer transition-transform transform hover:scale-110 shadow-lg"
                onClick={() => onRemoveImage(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
