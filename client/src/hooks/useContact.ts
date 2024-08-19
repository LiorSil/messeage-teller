import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";
import { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

interface SubContact {
  _id: string;
  name: string;
  phoneNumber: string;
}

interface Contact {
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  contacts: SubContact[];
}

const useContact = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { currentContact, loading, error } = useSelector(
    (state: RootState) =>
      state.contact as {
        currentContact: Contact | null;
        loading: boolean;
        error: string | null;
      }
  );



  useEffect(() => {
    if (token) {
      dispatch(fetchContact(token));
    }
  }, [dispatch, token]);

  

  return { currentContact, loading, error };
};

export default useContact;
