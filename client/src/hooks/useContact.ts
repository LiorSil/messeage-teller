import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { selectContactData } from "../redux/selectors/contactSelectors"; // Import the memoized selector

const useContact = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { contact, loading, error } = useSelector(selectContactData);

  useEffect(() => {
    if (token && !loading) {
      dispatch(fetchContact(token));
    }
  }, [token, dispatch, loading]);

  return { contact, error, loading };
};

export default useContact;
