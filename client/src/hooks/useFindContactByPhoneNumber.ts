import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchContactByPhoneNumber,
  setPhoneNumber,
} from "../redux/slices/contactSlice";
import { useMemo, useCallback } from "react";
import Cookies from "universal-cookie";

const useFindContactByPhoneNumber = () => {
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

  const handleFetchContactByPhoneNumber = useCallback(
    (phoneNumber: string) => {
      dispatch(fetchContactByPhoneNumber({ token, phoneNumber }));
    },
    [dispatch, token]
  );

  return {
    subContacts,
    findContactLoading,
    error,
    handleSetPhoneNumber,
    handleFetchContactByPhoneNumber,
  };
};

export default useFindContactByPhoneNumber;
