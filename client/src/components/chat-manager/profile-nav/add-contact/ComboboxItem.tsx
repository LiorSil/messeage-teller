import React from "react";

interface ComboboxItemProps {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
}

const ComboboxItem: React.FC<ComboboxItemProps> = ({
  text,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`cursor-pointer py-2 px-4 mt-2 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 ${
        isSelected ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center w-full">
        <span>{text}</span>
        {isSelected && (
          <span className="hs-combo-box-selected:block">
            <svg
              className="shrink-0 size-3.5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

export default ComboboxItem;
