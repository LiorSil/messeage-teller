import React, { useState } from "react";
import ComboboxContainer from "./ComboboxContainer";
import ComboboxInput from "./ComboboxInput";
import ComboboxDropdown from "./ComboboxDropdown";
import ComboboxItem from "./ComboboxItem";
import useFindContactByPhoneNumber from "../../../../hooks/useFindContactByPhoneNumber";
import useModifySubContacts from "../../../../hooks/useModifySubContacts";

// Define the Contact interface
interface Contact {
  name: string;
  phoneNumber: string;
}

// Type guard to check if an object is a Contact
const isContact = (obj: any): obj is Contact => {
  return (
    obj && typeof obj.name === "string" && typeof obj.phoneNumber === "string"
  );
};

const AddContact: React.FC = () => {
  // Local state to store the query and the selected item
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  console.log("selectedItem", selectedItem);

  const { handleSetContactByPN, handleFetchContactByPN, subContact } =
    useFindContactByPhoneNumber();

  const { handleAddSubContact } = useModifySubContacts();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSetContactByPN(value);

    if (value.length === 10) {
      handleFetchContactByPN(value);
    }
  };

  const handleItemClick = (item: string) => {
    setSelectedItem((prev) => {
      return prev === item ? null : item;
    });
  };

  const numbers: Contact[] = [];

  if (isContact(subContact) && subContact.phoneNumber === query) {
    numbers.push(subContact);
  }

  return (
    <ComboboxContainer>
      <ComboboxInput
        value={query}
        onChange={handleInputChange}
        onClear={() => setQuery("")}
      />
      <ComboboxDropdown
        isVisible={!!query}
        onAddContact={() => {
          if (selectedItem) {
            handleAddSubContact(selectedItem);
          }
        }}
      >
        {numbers.map((item, index) => (
          <ComboboxItem
            key={index}
            text={item.name}
            isSelected={item.phoneNumber === selectedItem}
            onClick={() => handleItemClick(item.phoneNumber)}
          />
        ))}
      </ComboboxDropdown>
    </ComboboxContainer>
  );
};

export default AddContact;
