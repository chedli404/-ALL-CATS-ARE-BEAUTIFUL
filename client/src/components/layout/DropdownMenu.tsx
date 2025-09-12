import { useState, useRef } from "react";
import { Link } from "wouter";

interface DropdownMenuProps {
  label: string;
  links: { href: string; label: string }[];
}

export default function DropdownMenu({ label, links }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown on button click
  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };
  // Close dropdown when a link is clicked
  const handleMenuClick = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-3 py-2 font-medium text-gray-300 hover:text-white text-sm md:text-base xl:text-lg inline-block focus:outline-none"
        onClick={handleButtonClick}
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 mt-2 w-48 bg-[rgba(20,20,20,0.98)] rounded shadow-lg border border-gray-800 z-50"
        >
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                onClick={handleMenuClick}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
