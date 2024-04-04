import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=" flex justify-between mb-8 items-center">
      <Link to="/" className="no-underline text-inherit font-bold text-xl">
        Mohammed Blog
      </Link>
      <nav className="flex gap-4">
        <Link to="/login" className="">
          Login
        </Link>
        <Link to="/register" className="">
          Register
        </Link>
      </nav>
    </header>
  );
}
