export const ImageUpload = ({ onChange, imagePreviews }) => {
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
        <div className="mt-4 grid grid-cols-2 gap-4">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg border border-gray-600"
            />
          ))}
        </div>
      )}
    </div>
  );
};
