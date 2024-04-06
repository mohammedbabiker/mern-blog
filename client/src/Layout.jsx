import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-white dark:bg-stone-900 dark:text-stone-300">
      <main className="p-10 max-w-screen-lg m-0 mx-auto pt-24">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
