import { useState, useEffect, useCallback } from "react";
import { fetchAddSubContact } from "../redux/thunks/subContactThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { clearQuery } from "../redux/slices/subContactFinderSlice";

const useModifySubContacts = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showNotice, setShowNotice] = useState(false);
  const handleShowNotice = useCallback(() => {
    setShowNotice((prev) => !prev);
  }, []);

  const handleAddSubContact = useCallback(
    (subContactId: string) => {
      dispatch(fetchAddSubContact({ subContactId }));
      dispatch(clearQuery());
      setShowNotice(true);
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
