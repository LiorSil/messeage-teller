import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";
import { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

const useContact = () => {
   const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { contact, loading, error } = useSelector(
    (state: RootState) => state.contact
  );

  const { _id } = contact || {};

  useEffect(() => {
    console.log("contact", contact);
    if (token && !_id) {
      dispatch(fetchContact(token));
    }
  }, [token, dispatch, contact, _id]);

  return { contact, error, loading, dispatch };
};

export default useContact;
