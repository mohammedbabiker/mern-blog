import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

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
            <Link onClick={logout} className="">
              Logout
            </Link>
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
