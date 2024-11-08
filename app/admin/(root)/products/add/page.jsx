import { Fragment } from 'react';

export default function Add() {
  return (
    <Fragment>
      <div className="flex justify-center">
        <form className="bg-gray-800 p-8 rounded-lg w-full max-w-full">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">username</label>
              <input className="w-full p-2 bg-gray-700 rounded" type="text" />
            </div>
            <div>
              <label className="block mb-2">email</label>
              <input className="w-full p-2 bg-gray-700 rounded" type="email" />
            </div>
            <div>
              <label className="block mb-2">password</label>
              <input className="w-full p-2 bg-gray-700 rounded" type="password" />
            </div>
            <div>
              <label className="block mb-2">phone</label>
              <input className="w-full p-2 bg-gray-700 rounded" type="text" />
            </div>
            <div>
              <label className="block mb-2">Is Admin?</label>
              <select className="w-full p-2 bg-gray-700 rounded">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Is Active?</label>
              <select className="w-full p-2 bg-gray-700 rounded">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-2">address</label>
              <textarea className="w-full p-2 bg-gray-700 rounded h-24"></textarea>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-teal-600 p-3 rounded text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <footer className="text-center mt-8">
        <p className="text-gray-400">© All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
