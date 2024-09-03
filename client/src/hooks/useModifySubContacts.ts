const VITE_API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

import { useState, useEffect, useMemo, useCallback } from "react";
import { updateContact } from "../redux/slices/contactSlice";
import { updateSubContacts } from "../redux/slices/subContactFinderSlice";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";

const useModifySubContacts = () => {
  const [showNotice, setShowNotice] = useState(false);
  const handleShowNotice = useCallback(() => {
    setShowNotice((prev) => !prev);
  }, []);

  const dispatch = useDispatch();
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const handleAddSubContact = (newSubContactNumber: string) => {
    axios
      .put(
        `${VITE_API_URL}/contacts/addSubContact`,
        {
          phoneNumber: newSubContactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(updateContact(response.data));
        dispatch(updateSubContacts(response.data.subContacts));
        setShowNotice(true);
      })
      .catch((error) => {
        console.error(error);
        setShowNotice(true);
      });
  };

  useEffect(() => {
    if (showNotice) {
      console.log("Sub contact added successfully");
    }
  }, [showNotice]);

  return {
    handleAddSubContact,
    showNotice,
    handleShowNotice,
  };
};

export default useModifySubContacts;
