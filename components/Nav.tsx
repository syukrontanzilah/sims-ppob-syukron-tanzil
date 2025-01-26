import Link from "next/link";
// next hooks
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface LinkItem {
  path: string;
  name: string;
}

interface NavProps {
  containerStyles?: string;
  linkStyles?: string;
  underlineStyles?: string;
  onClick?: () => void;
}

const links: LinkItem[] = [
  { path: "/topup", name: "top up" },
  { path: "/transaction", name: "Transaction" },
  { path: "/profile", name: "Akun" },
];

const Nav: React.FC<NavProps> = ({ 
    containerStyles, 
    linkStyles, 
    underlineStyles, 
    onClick
 }) => {
  const path = usePathname();
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.path}
            className={`capitalize text-sm font-bold ml-4 ${link.path === path ? "text-red-500": ""}  ${linkStyles}`}
            onClick={onClick}
          >
            {link.path === path && (
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className={`${underlineStyles}`}
              />
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
