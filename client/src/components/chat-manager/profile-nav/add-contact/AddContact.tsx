import React, { useState, useCallback } from "react";
import ComboboxContainer from "./ComboboxContainer";
import ComboboxInput from "./ComboboxInput";
import ComboboxDropdown from "./ComboboxDropdown";
import ComboboxItem from "./ComboboxItem";
import useFindContact from "../../../../hooks/useFindContact";
import useModifySubContacts from "../../../../hooks/useModifySubContacts";
import {useContact} from "../../../../hooks/useContact";




const AddContact = () => {
  
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { handleFetchContactByPhoneOrName, query, handleUpdateQuery, handleClearQuery } = 
  useFindContact();

    const { potentialSubContacts } = useContact(); 
  const { handleModifyContact} =
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

  return (
    <>
     
      <ComboboxContainer>
        <ComboboxInput
          value={query}
          onChange={handleInputChange}
          onClear={() => handleClearQuery()}
        />
        <ComboboxDropdown
          isVisible={query.length >= 5}
          onAddContact={() => {
            if (selectedItem && potentialSubContacts.length > 0) {
              handleModifyContact(selectedItem, "add");
            } else {
              alert("Please select a contact to add");
            }
          }}
        >
          {potentialSubContacts.map((subContact, index) => {
            return (
              <ComboboxItem
                key={index}
                text={subContact.name}
                isSelected={subContact.subContactId === selectedItem}
                onClick={() => handleItemClick(subContact.subContactId)}
              />
            );
          })}
        </ComboboxDropdown>
      </ComboboxContainer>
    </>
  );
};

export default AddContact;
