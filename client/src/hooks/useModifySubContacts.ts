import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance.ts";
import { updateContact } from "../redux/slices/contactSlice";
import { useDispatch } from "react-redux";

const useModifySubContacts = () => {
  const [showNotice, setShowNotice] = useState(false);
  const handleShowNotice = useCallback(() => {
    setShowNotice((prev) => !prev);
  }, []);

  const dispatch = useDispatch();

  const handleAddSubContact = (subContactId: string) => {
    axiosInstance
      .put(`/contacts/addSubContact`, {
        subContactId,
      })
      .then((response) => {
        dispatch(updateContact(response.data));
        setShowNotice(true);
      })
      .catch((error) => {
        console.error(error);
        setShowNotice(true);
      });
  };

  useEffect(() => {
    if (showNotice) {
      console.log("Sub contact added successfully");
    }
  }, [showNotice]);

  return {
    handleAddSubContact,
    showNotice,
    handleShowNotice,
  };
};

export default useModifySubContacts;
