import { useState } from "react";

const useProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("Lior SIlmanA");

  const handleEditClick = () => setIsEditMode(true);
  const handleCancelClick = () => setIsEditMode(false);
  const handleSaveClick = () => {
    // Here you could add code to save the changes, e.g., send to an API
    setIsEditMode(false);
  };

  return {
    isEditMode,
    name,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    setName,
  };
};

export default useProfile;
