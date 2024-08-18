import React, { useState, useCallback, useMemo } from "react";
import ComboboxContainer from "./ComboboxContainer";
import ComboboxInput from "./ComboboxInput";
import ComboboxDropdown from "./ComboboxDropdown";
import ComboboxItem from "./ComboboxItem";
import useFindContactByPhoneNumber from "../../../../hooks/useFindContactByPhoneNumber";
import useModifySubContacts from "../../../../hooks/useModifySubContacts";
import useContact from "../../../../hooks/useContact";

interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
}

// Type guard to check if an object is a Contact
const isContact = (obj: any): obj is Contact => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    typeof obj.phoneNumber === "string"
  );
};

const AddContact: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { handleSetPhoneNumber, handleFetchContactByPhoneNumber, subContacts } =
    useFindContactByPhoneNumber();

  const { handleAddSubContact } = useModifySubContacts();
  const { addContactSuccess } = useContact();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      handleSetPhoneNumber(value);

      if (value.length >= 5) {
        handleFetchContactByPhoneNumber(value);
      }
    },
    [handleSetPhoneNumber, handleFetchContactByPhoneNumber]
  );

  const handleItemClick = useCallback((phoneNumber: string) => {
    setSelectedItem((prev) => (prev === phoneNumber ? null : phoneNumber));
  }, []);

  // Ensure subContacts are valid Contacts
  const validContacts = useMemo(() => {
    return subContacts.filter(isContact);
  }, [subContacts]);

  return (
    <>
      {console.log("Add contact success", addContactSuccess)}

      {addContactSuccess && (
        <p className="bg-green-500">Contact added successfully</p>
      )}
      <ComboboxContainer>
        <ComboboxInput
          value={query}
          onChange={handleInputChange}
          onClear={() => setQuery("")}
        />
        <ComboboxDropdown
          isVisible={query.length >= 5}
          onAddContact={() => {
            if (selectedItem) {
              handleAddSubContact(selectedItem);
            }
          }}
        >
          {validContacts.map((item: Contact, index) => {
            if (!isContact(item)) {
              return null;
            }
            return (
              <ComboboxItem
                key={index}
                text={item.name}
                isSelected={item.phoneNumber === selectedItem}
                onClick={() => handleItemClick(item.phoneNumber)}
              />
            );
          })}
        </ComboboxDropdown>
      </ComboboxContainer>
    </>
  );
};

export default AddContact;
