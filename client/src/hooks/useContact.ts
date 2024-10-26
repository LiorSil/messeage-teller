import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";
import { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

const useContact = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { loading, error, contact } = useSelector(
    (state: RootState) => state.contact
  );
  

  useEffect(() => {
    if (token) {
      dispatch(fetchContact(token));
    }
  }, [token, dispatch]);

  return {
    contact,
    error,
    loading,
    dispatch,
    token,
    sortedSubContacts: contact?.subContacts,
  };
};

export default useContact;
