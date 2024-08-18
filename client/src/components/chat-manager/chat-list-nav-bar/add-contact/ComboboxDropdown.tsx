import Button from "../../../Button";

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
    <>
      <div
        className={`absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto ${
          isVisible ? "" : "hidden"
        } [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300`}
        data-hs-combo-box-output=""
      >
        {children}
        <Button
          type="button"
          className="w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 my-2"
          onClick={() => onAddContact()}
        >
          Add Contact
        </Button>
      </div>
    </>
  );
};

export default ComboboxDropdown;
