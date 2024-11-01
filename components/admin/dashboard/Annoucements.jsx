export const Announcements = () => {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">🔥 Available Now</h2>
        <p className="text-gray-400 mb-2">
          How to use the new version of the admin dashboard?
        </p>
        <p className="text-gray-400 mb-4">Takes 4 minutes to learn</p>
        <p className="text-gray-400 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          eius libero perspiciatis recusandae possimus.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Watch
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">🚀 Coming Soon</h2>
        <p className="text-gray-400 mb-2">
          New server actions are available, partial pre-rendering is coming up!
        </p>
        <p className="text-gray-400 mb-4">Boost your productivity</p>
        <p className="text-gray-400 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          eius libero perspiciatis recusandae possimus.
        </p>
        <button className="bg-purple-500 text-white px-4 py-2 rounded">
          Learn
        </button>
      </div>
    </div>
  );
};
