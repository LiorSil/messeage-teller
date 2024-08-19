import React from "react";

interface ComboboxInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const ComboboxInput: React.FC<ComboboxInputProps> = ({
  value,
  onChange,
  onClear,

}) => {
  return (
    <div className="relative">
      <input
        className="bg-app-palette-sap-green-light-+40 py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-app-palette-cool-gray-+20 focus:ring-app-palette-cool-gray-+20  disabled:opacity-50 disabled:pointer-events-none"
        type="text"
        maxLength={10}
        role="combobox"
        aria-expanded="false"
        value={value}
        onChange={onChange}
        // onKeyDown={(e) => {
        //   if (
        //     !/[0-9]/.test(e.key) &&
        //     e.key !== "Backspace" &&
        //     e.key !== "Delete" &&
        //     e.key !== "ArrowLeft" &&
        //     e.key !== "ArrowRight" &&
        //     e.key !== "Tab" &&
        //     e.key !== "Enter"
        //   ) {
        //     e.preventDefault();
        //   }
        // }}
        data-hs-combo-box-input=""
      />
      {value && (
        <div className="absolute inset-y-0 end-8 items-center z-20 flex">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            aria-label="Clear"
            onClick={onClear}
          >
            <span className="sr-only">Clear</span>
            <svg
              className="shrink-0 size-4"
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
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M15 9l-6 6"></path>
              <path d="M9 9l6 6"></path>
            </svg>
          </button>
        </div>
      )}
      <div
        className="absolute top-1/2 end-3 -translate-y-1/2"
        aria-expanded="false"
        data-hs-combo-box-toggle=""
      >
        <svg
          className="shrink-0 size-3.5 text-gray-500"
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
          <path d="M7 15l5 5 5-5"></path>
          <path d="M7 9l5-5 5 5"></path>
        </svg>
      </div>
    </div>
  );
};

export default ComboboxInput;
