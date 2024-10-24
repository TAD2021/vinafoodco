
import { usePathname } from "next/navigation";

const useSlug = () => {
    const pathName = usePathname();
    const slug = pathName.split('/').pop();

    return slug;
};

export default useSlug;
