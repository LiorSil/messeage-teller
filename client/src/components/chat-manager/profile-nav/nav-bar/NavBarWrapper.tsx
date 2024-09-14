import React from "react";

interface NavBarWrapperProps {
  children: React.ReactNode;
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({ children }) => {
  return (
    <nav className="relative border-black border-2 bg-app-palette-sap-green-light-+0 rounded-md m-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {children}
      </div>
    </nav>
  );
};

export default NavBarWrapper;