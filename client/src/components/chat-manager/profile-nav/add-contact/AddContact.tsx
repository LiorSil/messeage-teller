import React, { useState, useCallback, useMemo } from "react";
import ComboboxContainer from "./ComboboxContainer";
import ComboboxInput from "./ComboboxInput";
import ComboboxDropdown from "./ComboboxDropdown";
import ComboboxItem from "./ComboboxItem";
import useFindContact from "../../../../hooks/useFindContact";
import useModifySubContacts from "../../../../hooks/useModifySubContacts";
import NoticeComponent from "../../../../shared/NoticeMessage";
import { useSelector } from "react-redux";
import useContact from "../../../../hooks/useContact";

const isContact = (obj: any): obj is Contact => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    typeof obj.phoneNumber === "string"
  );
};

interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
}

const AddContact = () => {
  
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { handleFetchContactByPhoneOrName, query, handleUpdateQuery, handleClearQuery } = 
  useFindContact();

    const { contact } = useContact()
    const subContacts = contact?.subContacts || []



  const { handleAddSubContact, showNotice, handleShowNotice } =
    useModifySubContacts();

  const handleInputChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      handleUpdateQuery(value);
      if (value.length >= 5) {
        handleFetchContactByPhoneOrName(value);
      }
    },
    [handleFetchContactByPhoneOrName]
  );
  const handleItemClick = useCallback((subContactId: string) => {
    setSelectedItem((prev) => (prev === subContactId ? null : subContactId));
  }, []);

  const validContacts = useMemo(() => {
    return subContacts.filter(isContact);
  }, [subContacts]);

  return (
    <>
      {showNotice && (
        <NoticeComponent
          message="Contact added successfully"
          onClose={() => handleShowNotice()}
        />
      )}

      <ComboboxContainer>
        <ComboboxInput
          value={query}
          onChange={handleInputChange}
          onClear={() => handleClearQuery()}
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
                isSelected={item._id === selectedItem}
                onClick={() => handleItemClick(item._id)}
              />
            );
          })}
        </ComboboxDropdown>
      </ComboboxContainer>
    </>
  );
};

export default AddContact;
