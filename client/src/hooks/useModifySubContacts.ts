import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchAddSubContact } from "../redux/slices/contactSlice";

import { useMemo } from "react";
import Cookies from "universal-cookie";

const useModifySubContacts = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const handleAddSubContact = (newSubContactNumber: string) => {
    dispatch(fetchAddSubContact({ token, newSubContactNumber }));
  };

  return {
    handleAddSubContact,
  };
};

export default useModifySubContacts;
