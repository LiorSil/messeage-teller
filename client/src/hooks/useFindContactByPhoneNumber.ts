import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchContactByPhoneNumber,
  setPhoneNumber,
} from "../redux/slices/contactSlice";

import { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

const useFindContactByPhoneNumber = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { contact, findContactLoading, error, phoneNumber } = useSelector(
    (state: RootState) => state.contact
  );

  const handleFindContactByPhoneNumber = (phoneNumber: string) => {
    dispatch(setPhoneNumber(phoneNumber));
  };

  useEffect(() => {
    dispatch(fetchContactByPhoneNumber({ token, phoneNumber: phoneNumber }));
  }, [dispatch, token, cookies, phoneNumber]);

  return { contact, findContactLoading, error, handleFindContactByPhoneNumber };
};

export default useFindContactByPhoneNumber;
