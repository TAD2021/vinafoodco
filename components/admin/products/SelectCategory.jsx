export const SelectCategory = ({ categories, selectedCategory, onChange }) => {
  return (
    <div>
      <label className="block mb-2">Category</label>
      <select
        className="w-full p-2 bg-gray-700 rounded"
        value={selectedCategory}
        onChange={onChange}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
