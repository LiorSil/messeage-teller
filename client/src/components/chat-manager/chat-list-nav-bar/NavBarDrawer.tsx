import React from "react";
import AddContact from "./add-contact/AddContact";

interface NavBarDrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const NavBarDrawer: React.FC<NavBarDrawerProps> = ({ isOpen, children }) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-app-palette-cool-gray-+0 border-gray-700 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
        id="navbar-hamburger"
      >
        {children}
        <AddContact />
      </div>
    </>
  );
};

export default NavBarDrawer;
