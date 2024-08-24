import React from "react";

type Props = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const IconButtonWrapper = (props: Props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`p-2 hover:bg-app-palette-grey-green-light--20 rounded-full focus:outline-none ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default IconButtonWrapper;
