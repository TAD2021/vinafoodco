import { FaBars, FaBell, FaCog } from 'react-icons/fa';

export const Header = ({ toggleSidebar, title }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <button
          className="md:hidden text-gray-400 mr-4"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center">
        <input
          className="p-2 rounded bg-gray-800 text-gray-400 mr-4"
          placeholder="Search..."
          type="text"
        />
        <FaBell className="mr-4" />
        <FaCog />
      </div>
    </div>
  );
};
