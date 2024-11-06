import Image from 'next/image';
import { Fragment } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Products() {
  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              className="bg-gray-800 text-gray-400 rounded-full pl-10 pr-4 py-2 w-full md:w-auto focus:outline-none"
              placeholder="Search for a product"
              type="text"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            Add New
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-2">Title</th>
                <th className="py-2">Description</th>
                <th className="py-2">Price</th>
                <th className="py-2">Created at</th>
                <th className="py-2">Stock</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2 flex items-center">
                  <Image
                    alt="Product image"
                    className="w-10 h-10 rounded-full mr-2"
                    height={100}
                    src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    width={100}
                  />
                  iphone
                </td>
                <td className="py-2">
                  sdfjhkasdjhfkjashfkashdfkahsdfkhaskdfh...
                </td>
                <td className="py-2">$123</td>
                <td className="py-2">Oct 29 2023</td>
                <td className="py-2">34</td>
                <td className="py-2">
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2">
                    View
                  </button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 flex items-center">
                  <img
                    alt="Product image"
                    className="w-10 h-10 rounded-full mr-2"
                    height="100"
                    src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    width="100"
                  />
                  lg monitor
                </td>
                <td className="py-2">
                  sdfjhkasdjhfkjashfkashdfkahsdfkhaskdfh...
                </td>
                <td className="py-2">$123</td>
                <td className="py-2">Oct 29 2023</td>
                <td className="py-2">34</td>
                <td className="py-2">
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2">
                    View
                  </button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-gray-700 text-gray-400 px-4 py-2 rounded"
              disabled=""
            >
              Previous
            </button>
            <button className="bg-gray-700 text-gray-400 px-4 py-2 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
      <footer className="text-center mt-4">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
