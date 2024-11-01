export default function Login() {
  return (
    <>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="username"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="password"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded bg-teal-600 text-white font-bold hover:bg-teal-700"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
