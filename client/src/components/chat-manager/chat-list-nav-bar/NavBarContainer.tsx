import React from "react";

const NavBarContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <nav className="relative border-black border-2 bg-app-palette-sap-green-light-+0 rounded-md m-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {children}
      </div>
    </nav>
  );
};

export default NavBarContainer;
