import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchContact} from "../redux/slices/contactSlice";


export const useContact = () => {
  const { error, contact, potentialSubContacts } = useSelector(
    (state: RootState) => state.contact
  );

  return {
    contact,
    error,
    potentialSubContacts,
  };
};

export const useContactFetch = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);
};


