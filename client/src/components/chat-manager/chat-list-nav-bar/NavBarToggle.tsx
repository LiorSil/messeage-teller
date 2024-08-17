import React from "react";

interface NavBarToggleProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavBarToggle: React.FC<NavBarToggleProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      type="button"
      className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-app-palette-sap-green-light--20 focus:outline-none focus:ring-2 focus:ring-app-palette-sap-green-light--20"
      aria-controls="navbar-hamburger"
      aria-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );
};

export default NavBarToggle;
