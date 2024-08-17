import React from "react";

interface NavBarBackdropProps {
  isOpen: boolean;
  handleOutsideClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NavBarBackdrop: React.FC<NavBarBackdropProps> = ({
  isOpen,
  handleOutsideClick,
}) => {
  return (
    isOpen && (
      <div
        id="backdrop"
        className="fixed inset-0 bg-app-palette-muted-turquoise--10  bg-opacity-50 z-40"
        onClick={handleOutsideClick}
      ></div>
    )
  );
};

export default NavBarBackdrop;
