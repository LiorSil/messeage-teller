import React from "react";

interface NavBarWrapperProps {
  children: React.ReactNode;
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({ children }) => {
  return (
    <nav className=" md:relative border-black border-2 bg-app-palette-sap-green-light-+0 rounded-md m-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {children}
      </div>
    </nav>
  );
};

export default NavBarWrapper;
