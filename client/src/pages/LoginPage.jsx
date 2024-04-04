import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function loginUser(ev) {
    ev.preventDefault();
    const resopnes = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // save cookie token
    });
    if (resopnes.ok) {
      setRedirect(true);
    } else {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <form className="max-w-md my-0 mx-auto" onSubmit={loginUser}>
      <h1 className="text-3xl font-bold mb-5 text-center">Login</h1>
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
      <button
        type="submit"
        className="w-full bg-gray-500 border-none rounded-md text-white p-1"
      >
        Login
      </button>
    </form>
  );
}
