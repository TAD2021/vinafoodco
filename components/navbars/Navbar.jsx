"use client";

import Category from "../Category";
import useRoutes from "@/hooks/useRoutes";
import NavbarItem from "./NavbarItem";

function Navbar() {
  const routes = useRoutes();

  return (
    <nav className="bg-emerald-600 lg:block hidden">
      <div className="container mx-auto flex justify-between items-center px-6">
        <ul className="flex space-x-4 text-white">
          <li className="flex items-center">
            <Category />
          </li>
          {routes.map((item) => (
            <NavbarItem
              key={item.label}
              href={item.href}
              label={item.label}
              active={item.active}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
