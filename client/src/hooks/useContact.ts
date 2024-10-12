import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";
import { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { selectContactsWithLatestMessages } from "../redux/selectors/contactSelector";

const useContact = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { loading, error } = useSelector((state: RootState) => state.contact);

  const { sortedSubContacts, contact } = useSelector(
    selectContactsWithLatestMessages
  );

  const { _id } = contact || {};

  useEffect(() => {
    if (token && !_id) {
      dispatch(fetchContact(token));
    }
  }, [token, dispatch, contact, _id]);

  return {
    contact,
    error,
    loading,
    dispatch,
    token,
    sortedSubContacts,
  };
};

export default useContact;
