export default function RegisterPage() {
  return (
    <form className="max-w-md my-0 mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-center">Register</h1>
      <input
        type="text"
        placeholder="Username"
        className="block mb-3 w-full py-1 px-3 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        className="block mb-3 w-full py-1 px-3 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-gray-500 border-none rounded-md text-white p-1"
      >
        Register
      </button>
    </form>
  );
}
