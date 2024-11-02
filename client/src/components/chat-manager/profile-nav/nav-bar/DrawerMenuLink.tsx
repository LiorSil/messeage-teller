import React from "react";

interface DrawerMenuLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onSelect: () => void;
}

const DrawerMenuLink: React.FC<DrawerMenuLinkProps> = ({
  label,
  isActive,
  onSelect,
}) => {


  return (
    <li
      onClick={() => {
        onSelect();
      }}
    >
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
    </li>
  );
};

export default DrawerMenuLink;
