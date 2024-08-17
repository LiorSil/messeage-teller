import React from "react";

interface NavBarItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavBarItem: React.FC<NavBarItemProps> = ({
  href,
  label,
  isActive,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <a
        href={href}
        className={`block py-2 px-3 rounded ${
          isActive
            ? "text-white bg-blue-500"
            : "text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </a>
    </li>
  );
};

export default NavBarItem;
