import {useState, useEffect, useCallback} from "react";
import {useContact} from "./useContact";
import axiosInstance from "../api/axiosInstance.ts";
import { updateName } from "../redux/slices/contactSlice.ts";
import { AppDispatch } from "../redux/store.ts";
import { useDispatch } from "react-redux";

export const useProfile = () => {
  const { contact } = useContact();
  const dispatch: AppDispatch = useDispatch();

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
    try {
      const response = await axiosInstance.put("/contacts/updateContact", {
        data: { name },
      });
      if (response.status === 200) {
        window.alert("Changes saved successfully!");
        setIsEditMode(false);
        setName(name);
        dispatch(updateName(name));
      } else {
        window.alert("Failed to save changes. Please try again.");
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      window.alert("Failed to save changes. Please try again.");
    }
  }, [name, baseName, setIsEditMode, setName]);
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

 
