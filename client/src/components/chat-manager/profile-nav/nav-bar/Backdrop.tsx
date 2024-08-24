import React from "react";

interface BackdropProps {
  handleOutsideClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Backdrop: React.FC<BackdropProps> = ({ handleOutsideClick }) => {
  return (
    <div
      id="backdrop"
      className="fixed inset-0 bg-app-palette-muted-turquoise--10 bg-opacity-50 z-40"
      onClick={handleOutsideClick}
    ></div>
  );
};

export default Backdrop;
