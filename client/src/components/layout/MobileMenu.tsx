import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden bg-black/90 border-t border-earth/20">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              location === link.href
                ? "text-white bg-gray-800"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            } block px-3 py-2 rounded-md text-base font-medium`}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
