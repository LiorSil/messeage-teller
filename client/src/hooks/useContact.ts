import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";
import { useEffect } from "react";

import Cookies from "universal-cookie";

const useContact = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { contact, loading, error } = useSelector((state: RootState) => ({
    contact: state.contact.contact,
    loading: state.contact.loading,
    error: state.contact.error,
  }));

  useEffect(() => {
    if (token) {
      dispatch(fetchContact(token));
    } else {
      console.warn("No token found");
    }
  }, [dispatch, token]);

  return { contact, loading, error };
};

export default useContact;
