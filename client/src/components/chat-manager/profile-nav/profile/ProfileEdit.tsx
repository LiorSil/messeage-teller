import React from "react";
import CancelIconButton from "./CancelIconButton";
import SaveIconButton from "./SaveIconButton";

type ProfileEditProps = {
  name: string;
  onNameChange: (name: string) => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
};

const ProfileEdit: React.FC<ProfileEditProps> = ({
  name,
  onNameChange,
  onCancelClick,
  onSaveClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <input
        type="text"
        className="mr-4 w-full sm:w-3/4 rounded border bg-app-palette-sap-green-light-+70 p-2 focus:border-blue-500 focus:outline-none"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <div className="flex items-center justify-center space-x-2 mt-4 sm:mt-0 sm:ml-2 w-full sm:w-auto">
        <CancelIconButton onClick={onCancelClick} />
        <SaveIconButton onClick={onSaveClick} />
      </div>
    </div>
  );
};

export default ProfileEdit;
