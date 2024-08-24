import { useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cookies from "universal-cookie";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const useProfile = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = useMemo(() => cookies.get("token"), [cookies]);

  const baseName = useSelector(
    (state: RootState) => state.contact.contact?.name || ""
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(baseName);

  const handleEditClick = useCallback(() => setIsEditMode(true), []);
  const handleCancelClick = useCallback(() => setIsEditMode(false), []);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    switch (name) {
      case "":
        setIsNameValid(false);
        break;
      case baseName:
        setIsNameValid(false);
        break;

      default:
        setIsNameValid(true);
        break;
    }
  }, [name, baseName]);

  const handleSaveClick = useCallback(async () => {
    try {
      const response = await axios.put(
        `${VITE_API_URL}/contacts/updateProfile`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        window.alert("Changes saved successfully!");
        window.location.reload();
        setIsEditMode(false);
      } else {
        throw new Error("Failed to save changes.");
      }
    } catch (error) {
      console.error(error.message);
      window.alert("Failed to save changes. Please try again.");
    }
  }, [name, token]);

  return {
    isEditMode,
    name,
    isNameValid,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    setName,
  };
};

export default useProfile;
