import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchContact } from "../redux/slices/contactSlice";

const useContact = () => {
  const dispatch: AppDispatch = useDispatch();

  const {  error, contact, potentialSubContacts } = useSelector(
    (state: RootState) => state.contact,
  );
    

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return {
    contact,
    error,
    potentialSubContacts,
    dispatch,
  };
};

export default useContact;
