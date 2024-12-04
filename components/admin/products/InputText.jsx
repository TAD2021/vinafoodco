export const InputText = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <input
        className="w-full p-2 bg-gray-700 rounded"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
