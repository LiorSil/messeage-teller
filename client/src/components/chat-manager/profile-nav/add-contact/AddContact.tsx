import React, { useState, useCallback, useMemo } from "react";
import ComboboxContainer from "./ComboboxContainer";
import ComboboxInput from "./ComboboxInput";
import ComboboxDropdown from "./ComboboxDropdown";
import ComboboxItem from "./ComboboxItem";
import useFindContact from "../../../../hooks/useFindContact";
import useModifySubContacts from "../../../../hooks/useModifySubContacts";

interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
}

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

  const {
    handleSetPhoneNumber,
    handleFetchContactByPhoneOrName,
    subContacts,
    handleClearAddContactSuccess,
  } = useFindContact();

  const { handleAddSubContact, addContactSuccess } = useModifySubContacts();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      handleSetPhoneNumber(value);
      handleClearAddContactSuccess();

      if (value.length >= 5) {
        handleFetchContactByPhoneOrName(value);
      }
    },
    [
      handleSetPhoneNumber,
      handleClearAddContactSuccess,
      handleFetchContactByPhoneOrName,
    ]
  );

  const handleItemClick = useCallback((phoneNumber: string) => {
    setSelectedItem((prev) => (prev === phoneNumber ? null : phoneNumber));
  }, []);

  const validContacts = useMemo(() => {
    return subContacts.filter(isContact);
  }, [subContacts]);

  return (
    <>
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
            if (selectedItem && subContacts.length > 0) {
              handleAddSubContact(selectedItem);
            } else {
              alert("Please select a contact to add");
            }
          }}
        >
          {validContacts.map((item, index) => {
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
