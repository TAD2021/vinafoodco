export const SingleImageUpload = ({ onChange, imagePreview }) => {
  return (
    <div className="col-span-2">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full p-2 bg-gray-700 rounded"
      />
      {imagePreview && (
        <div className="mt-4 flex overflow-x-auto space-x-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt={`Preview`}
              className="w-32 h-32 object-cover rounded-lg border border-gray-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};
