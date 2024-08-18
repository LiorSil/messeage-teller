import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchContactByPhoneNumber,
  setPhoneNumber,
} from "../redux/slices/contactSlice";

import { useMemo } from "react";
import Cookies from "universal-cookie";

const useFindContactByPhoneNumber = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { subContact, findContactLoading, error } =
    useSelector((state: RootState) => state.contact);

  const handleSetContactByPN = (phoneNumber: string) => {
    dispatch(setPhoneNumber(phoneNumber));
  };

  const handleFetchContactByPN = (phoneNumber: string) => {
    dispatch(fetchContactByPhoneNumber({ token, phoneNumber }));
  };

  return {
    subContact,
    findContactLoading,
    error,
    handleSetContactByPN,
    handleFetchContactByPN,
  };
};

export default useFindContactByPhoneNumber;
