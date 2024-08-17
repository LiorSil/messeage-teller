import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
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

  useEffect(() => {
    dispatch(fetchContact(token));
  }, [dispatch, token, cookies]);

  return { contact, loading, error };
};

export default useContact;
