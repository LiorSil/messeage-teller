import React from "react";

interface ButtonProps {
  type: "submit" | "button";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-app-palette-muted-turquoise--30 hover:bg-app-palette-muted-turquoise--50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-palette-cool-gray-+0 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
