import clsx from "clsx";
import Link from "next/link";

function NavbarItem({ label, href, active }) {
  return (
    <li className="flex items-center">
      <Link
        href={href}
        className={clsx(
          `
          hover:text-gray-200 transition duration-300`,
          active && "text-white"
        )}
      >
        {label.toUpperCase()}
      </Link>
    </li>
  );
}

export default NavbarItem;
