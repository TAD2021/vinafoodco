import { useMemo } from "react";
import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Trang chủ",
        href: "/",
        active: pathname === "/",
      },
      {
        label: "Giới thiệu",
        href: "/gioi-thieu",
        active: pathname === "/gioi-thieu",
      },
      {
        label: "Tin tức",
        href: "/tin-tuc",
        active: pathname === "/tin-tuc",
      },
      {
        label: "Khuyến mãi",
        href: "/khuyen-mai",
        active: pathname === "/khuyen-mai",
      },
      {
        label: "Liên hệ",
        href: "/lien-he",
        active: pathname === "/lien-he",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
