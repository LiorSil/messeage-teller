import React, { useEffect, useState } from "react";
import icon from "../../../../assets/icons/button-new-chat-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../../../redux/slices/contactSlice";
import { RootState, AppDispatch } from "../../../../redux/store";

const FindNewChat: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Explicitly type dispatch as AppDispatch
  const { contacts } = useSelector((state: RootState) => state.contact);

  const [isInputVisible, setInputVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const editPhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.match(/[^0-9]/g)) {
      return;
    }
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length > 10 || numericValue.length < 5) {
      return;
    }

    setPhoneNumber(numericValue);
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const toggleInputVisibility = () => {
    setInputVisible((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleInputVisibility}
        className="flex  md:w-30  space-x-2 p-2 text-white hover:bg-app-palette-muted-turquoise--20 hover:rounded-md focus:outline-none"
      >
        <span>New Chat</span>
        <img src={icon} alt="New chat" className="h-6 w-6" />
      </button>

      {isInputVisible && (
        <input
          maxLength={10}
          onChange={editPhoneHandler}
          placeholder="052-111-2345"
          className="w-5/6 p-2 rounded-lg bg-transparent border-2 border-app-palette-muted-turquoise--50 text-black focus:text-app-palette-cool-gray-+30 focus:ring-0 focus:border-app-palette-cool-gray-+30 focus:shadow-lg"
        />
      )}
    </>
  );
};

export default FindNewChat;
