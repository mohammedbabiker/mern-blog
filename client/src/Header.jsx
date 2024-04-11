import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import Darkmode from "./Darkmode";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]); // to remove

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="fixed z-10 top-0 inset-x-0 border-b dark:border-stone-600 bg-white dark:bg-stone-900 dark:text-stone-300">
      <nav className="flex items-center justify-between max-w-5xl mx-auto px-4 h-24">
        <Link to="/" className="no-underline text-inherit font-bold text-xl">
          Mohammed Blog
        </Link>
        {username && (
          <div className="flex items-center gap-4 space-x-1">
            {
              // <span> Welcome, {username}</span>
            }
            <Link to="/create" className="">
              Create Post
            </Link>
            <Darkmode />
            <Link
              onClick={logout}
              className="inline-flex gap-1 bg-gray-500 text-white rounded-[5px] px-2 py-1 items-center "
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </Link>
          </div>
        )}
        {!username && (
          <div className="flex gap-4 items-center">
            <Link to="/login" className="">
              Login
            </Link>
            <Link to="/register" className="">
              Register
            </Link>
            <Darkmode />
          </div>
        )}
      </nav>
    </header>
  );
}
