import React, { useRef } from "react";

interface ButtonProps {
  type: "submit" | "button";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  controlReference?: React.RefObject<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  type,

  children,
  className,
  onClick,
  disabled,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={` w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-app-palette-muted-turquoise--30 hover:bg-app-palette-muted-turquoise--50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-palette-cool-gray-+0 ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
