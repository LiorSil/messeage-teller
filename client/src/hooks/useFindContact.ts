import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchContactByPhoneOrName,
  setPhoneNumber,
  clearAddContactSuccess,
} from "../redux/slices/contactSlice";
import { useMemo, useCallback } from "react";
import Cookies from "universal-cookie";

const useFindContact = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { subContacts, findContactLoading, error } = useSelector(
    (state: RootState) => state.contact
  );

  const handleSetPhoneNumber = useCallback(
    (phoneNumber: string) => {
      dispatch(setPhoneNumber(phoneNumber));
    },
    [dispatch]
  );

  const handleFetchContactByPhoneOrName = useCallback(
    (phoneNumber: string) => {
      dispatch(fetchContactByPhoneOrName({ token, phoneNumber }));
    },
    [dispatch, token]
  );

  const handleClearAddContactSuccess = useCallback(() => {
    dispatch(clearAddContactSuccess());
  }, [dispatch]);

  return {
    subContacts,
    findContactLoading,
    error,
    handleSetPhoneNumber,
    handleFetchContactByPhoneOrName,
    handleClearAddContactSuccess,
  };
};

export default useFindContact;
