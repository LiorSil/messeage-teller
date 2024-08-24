import React from "react";
import AddContact from "../add-contact/AddContact";

interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  selectedComponent: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  children,
  selectedComponent,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-3/4 md:w-96 bg-app-palette-cool-gray-+0 border-gray-700 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
      id="navbar-hamburger"
    >
      {children}
      <div className="mt-4">{selectedComponent}</div>
    </div>
  );
};

export default Drawer;
