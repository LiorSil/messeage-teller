import React, { useState } from "react";

interface ComboboxContainerProps {
  children: React.ReactNode;
}

const ComboboxContainer: React.FC<ComboboxContainerProps> = ({ children }) => {
  return (
    <div className="relative w-4/5 m-auto my-4 " data-hs-combo-box="">
      {children}
    </div>
  );
};

export default ComboboxContainer;
