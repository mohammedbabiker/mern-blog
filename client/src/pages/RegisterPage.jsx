import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    const resopnse = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resopnse.status === 200) {
      alert("User registered successfully");
    } else {
      alert("Failed to register user");
    }
  }
  return (
    <form onSubmit={registerUser} className="max-w-md my-0 mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-center">Register</h1>
      <input
        type="text"
        placeholder="Username"
        className="block mb-3 w-full py-1 px-3 border border-gray-300 rounded-md"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block mb-3 w-full py-1 px-3 border border-gray-300 rounded-md"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="w-full bg-gray-500 border-none rounded-md text-white p-1">
        Register
      </button>
    </form>
  );
}
