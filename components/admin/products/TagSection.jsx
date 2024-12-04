export const TagSelection = ({ tags, selectedTags, onTagClick }) => {
  return (
    <div className="col-span-2">
      <label className="block mb-2">Select Tags</label>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            className={`mr-4 mb-2 px-4 py-2 rounded border transition-colors duration-300 
            ${
              selectedTags.includes(tag.id)
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-gray-700 text-gray-300 border-gray-600'
            } hover:bg-teal-500 hover:text-white hover:border-teal-500`}
            onClick={() => onTagClick(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};
