import { Fragment } from 'react';

export default function Add() {
  return (
    <Fragment>
      <div class="flex justify-center">
        <form class="bg-gray-800 p-8 rounded-lg w-full max-w-full">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-2">username</label>
              <input class="w-full p-2 bg-gray-700 rounded" type="text" />
            </div>
            <div>
              <label class="block mb-2">email</label>
              <input class="w-full p-2 bg-gray-700 rounded" type="email" />
            </div>
            <div>
              <label class="block mb-2">password</label>
              <input class="w-full p-2 bg-gray-700 rounded" type="password" />
            </div>
            <div>
              <label class="block mb-2">phone</label>
              <input class="w-full p-2 bg-gray-700 rounded" type="text" />
            </div>
            <div>
              <label class="block mb-2">Is Admin?</label>
              <select class="w-full p-2 bg-gray-700 rounded">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label class="block mb-2">Is Active?</label>
              <select class="w-full p-2 bg-gray-700 rounded">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="block mb-2">address</label>
              <textarea class="w-full p-2 bg-gray-700 rounded h-24"></textarea>
            </div>
          </div>
          <div class="mt-6">
            <button
              class="w-full bg-teal-600 p-3 rounded text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <footer class="text-center mt-8">
        <p class="text-gray-400">© All rights reserved.</p>
      </footer>
    </Fragment>
  );
}
