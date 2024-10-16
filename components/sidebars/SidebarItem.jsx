import clsx from "clsx";
import Link from "next/link";

function SidebarItem({ label, href, active }) {
  return (
    <li
      className={clsx(
        `py-2 border-b border-green-500 hover:text-white transition duration-300`,
        active && "text-white"
      )}
    >
      <Link href={href}>{label.toUpperCase()}</Link>
    </li>
  );
}

export default SidebarItem;
