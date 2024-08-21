import React from "react";

interface DrawerMenuLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const DrawerMenuLink: React.FC<DrawerMenuLinkProps> = ({
  href,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      {onClick ? (
        <button
          className={`block w-full text-left py-2 px-3 rounded ${
            isActive
              ? "text-white bg-blue-500"
              : "text-gray-400 hover:bg-gray-700 hover:text-white"
          }`}
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </button>
      ) : (
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
      )}
    </li>
  );
};

export default DrawerMenuLink;
