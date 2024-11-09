import { useState, useEffect, useCallback } from "react";
import { fetchAddSubContact } from "../redux/thunks/subContactThunks";

import { useDispatch } from "react-redux";

const useModifySubContacts = () => {
  const [showNotice, setShowNotice] = useState(false);
  const handleShowNotice = useCallback(() => {
    setShowNotice((prev) => !prev);
  }, []);

  const dispatch = useDispatch();

  const handleAddSubContact = useCallback(
    (subContactId: string) => {
      dispatch(fetchAddSubContact({ subContactId }));
    },
    [dispatch]
  );

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
