import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useChatRoom } from "./useChatRoom";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const useProfile = () => {
  const { token, contact } = useChatRoom();

  const baseName = contact?.name || "";

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(baseName);
  const [isNameValid, setIsNameValid] = useState(false);

  // Handle edit and cancel clicks with memoized functions
  const handleEditClick = useCallback(() => setIsEditMode(true), []);
  const handleCancelClick = useCallback(() => setIsEditMode(false), []);

  // Validate the name whenever it changes
  useEffect(() => {
    setIsNameValid(name !== "" && name !== baseName);
  }, [name, baseName]);

  // Handle saving the profile name
  const handleSaveClick = useCallback(async () => {
    console.log("token", token);
    try {
      const response = await axios.put(
        `${VITE_API_URL}/contacts/updateProfile`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        window.alert("Changes saved successfully!");
        setIsEditMode(false);
        // Optionally, update local state instead of reloading the page
        setName(baseName);
      } else {
        throw new Error("Failed to save changes.");
      }
    } catch (error) {
      console.error(error.message);
      window.alert("Failed to save changes. Please try again.");
    }
  }, [name, token, baseName]);

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
