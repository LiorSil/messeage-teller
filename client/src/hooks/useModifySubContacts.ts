import { useCallback } from "react";
import { fetchModifySubContact } from "../redux/thunks/subContactThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { clearQuery } from "../redux/slices/subContactFinderSlice";

const useModifySubContacts = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleModifyContact = useCallback(
    (subContactId: string, actionType: "add" | "delete") => {
      console.log("subContactId", subContactId, actionType);
      dispatch(fetchModifySubContact({ subContactId, actionType }));
      if (actionType === "add") dispatch(clearQuery());
      alert(`subContact actionType: ${actionType} successfully`);
    },
    [dispatch]
  );

  return {
    handleModifyContact,
  };
};

export default useModifySubContacts;
