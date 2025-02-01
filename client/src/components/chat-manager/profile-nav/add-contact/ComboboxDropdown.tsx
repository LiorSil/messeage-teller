import React from "react";
import Button from "../../../../shared/Button";

interface ComboboxDropdownProps {
  children: React.ReactNode;
  isVisible: boolean;
  onAddContact: () => void;
}

const ComboboxDropdown: React.FC<ComboboxDropdownProps> = ({
  children,
  isVisible,
  onAddContact,
}) => {
  return (
    <div
      className={`absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto ${
        isVisible ? "" : "hidden"
      } [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300`}
      data-hs-combo-box-output=""
      role="listbox"
    >
      {children}
      <Button type="button" className="mt-4" onClick={onAddContact}>
        Add Contact
      </Button>
    </div>
  );
};

export default ComboboxDropdown;
