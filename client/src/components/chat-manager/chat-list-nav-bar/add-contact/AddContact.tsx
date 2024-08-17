import React, { useState } from "react";
import ComboboxContainer from "./ComboboxContainer";
import ComboboxInput from "./ComboboxInput";
import ComboboxDropdown from "./ComboboxDropdown";
import ComboboxItem from "./ComboboxItem";
import Button from "../../../Button";
import useFindContactByPhoneNumber from "../../../../hooks/useFindContactByPhoneNumber";

const AddContact: React.FC = () => {
  const [query, setQuery] = useState("");

  const { handleFindContactByPhoneNumber } = useFindContactByPhoneNumber();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const items = ["Argentina", "Brazil", "China", "USA", "Italy", "France"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 8) {
      handleFindContactByPhoneNumber(e.target.value);
    }
  };

  const handleItemClick = (item: string) => {
    co;
    setSelectedItem(item);
    setQuery(item);
  };

  /* Dummy Data */

  const numbers = [
    { name: "lior silman", phoneNumber: "0502334528" },
    { name: "lior silmanA", phoneNumber: "0502334529" },
    { name: "lior silmanB", phoneNumber: "0502334530" },
  ].filter((item) =>
    item.phoneNumber.toLowerCase().includes(query.toLowerCase())
  );

  //   const filteredItems = items.filter((item) =>
  //     item.toLowerCase().includes(query.toLowerCase())
  //   );

  return (
    <ComboboxContainer>
      <ComboboxInput
        value={query}
        onChange={handleInputChange}
        onClear={() => setQuery("")}
      />
      <ComboboxDropdown isVisible={!!query}>
        {numbers.map((item, index) => (
          <ComboboxItem
            key={index}
            text={item.name}
            isSelected={item.name === selectedItem}
            onClick={() => handleItemClick(item.name)}
          />
        ))}
      </ComboboxDropdown>
    </ComboboxContainer>
  );
};

export default AddContact;
