import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAddSubContact } from "../redux/slices/contactSlice";

import { useMemo } from "react";
import Cookies from "universal-cookie";

const useModifySubContacts = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();
  const { addContactSuccess } = useSelector(
    (state: RootState) => state.contact
  );

  const handleAddSubContact = (newSubContactNumber: string) => {
    dispatch(fetchAddSubContact({ token, newSubContactNumber }));
  };

  return {
    handleAddSubContact,
    addContactSuccess,
    
  };
};

export default useModifySubContacts;
