import { FaUsers } from 'react-icons/fa';

export const StatsCard = ({ title, value, change }) => {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <div className="flex items-center justify-between mb-2">
        <span>{title}</span>
        <FaUsers />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-green-500">{change}</div>
    </div>
  );
};
