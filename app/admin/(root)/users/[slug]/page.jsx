'use client';
import { Fragment } from 'react';

export default function Detail() {
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row md:space-x-8 p-8">
        <div className="w-full md:w-1/3 bg-gray-800 p-8 flex flex-col items-center rounded-md shadow-lg">
          <img
            alt="Profile picture placeholder"
            className="rounded-md mb-4 border-2 border-teal-600" // Thêm border cho ảnh
            height="150"
            src="https://storage.googleapis.com/a1aa/image/71bI8tbiAQIbBl6aqADvO6VelZLMrfVAsWAgU9CnVnhwT4rTA.jpg"
            width="150"
          />
          <h2 className="text-lg font-bold text-white">User Profile</h2>
        </div>
        <div className="w-full md:w-2/3 p-4 bg-gray-800 rounded-md shadow-lg">
          <form className="space-y-4">
            {[
              { label: 'Username', type: 'text', value: 'hello' },
              { label: 'Email', type: 'email', value: 'hello@gmail.com' },
              { label: 'Password', type: 'password', value: 'dasdasd' },
              { label: 'Phone', type: 'text', value: '123213' },
              { label: 'Address', type: 'text', value: '' },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-300">
                  {field.label}
                </label>
                <input
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2.5 text-white focus:ring-teal-500 focus:border-teal-500"
                  type={field.type}
                  value={field.value}
                  onChange={() => {}} // Thêm onChange nếu cần
                />
              </div>
            ))}
            {[
              { label: 'Is Admin?', options: ['No', 'Yes'] },
              { label: 'Is Active?', options: ['No', 'Yes'] },
            ].map((selectField, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-300">
                  {selectField.label}
                </label>
                <select className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2.5 text-white focus:ring-teal-500 focus:border-teal-500">
                  {selectField.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-md transition duration-300"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center mt-8">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
