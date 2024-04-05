import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="p-10 max-w-screen-lg m-0 mx-auto">
      <Header />
      <Outlet />
    </main>
  );
}
