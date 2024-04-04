import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);
  return (
    <header className=" flex justify-between mb-8 items-center">
      <Link to="/" className="no-underline text-inherit font-bold text-xl">
        Mohammed Blog
      </Link>
      <nav className="flex gap-4">
        {username && (
          <>
            <Link to="/create" className="">
              Create new Post
            </Link>
            <a href="/logout" className="">
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="">
              Login
            </Link>
            <Link to="/register" className="">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
