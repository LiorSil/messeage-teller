import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { selectContactData } from "../redux/selectors/contactSelectors"; // Import the memoized selector

const useContact = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { contact, getContactLoading, error } = useSelector(selectContactData);

  useEffect(() => {
    if (token && !getContactLoading) {
      dispatch(fetchContact(token));
    }
  }, [token, dispatch, getContactLoading]);

  return { contact, error, getContactLoading };
};

export default useContact;
