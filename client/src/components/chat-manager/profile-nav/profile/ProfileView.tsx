import React from "react";
import EditIconButton from "./EditIconButton";

type ProfileViewProps = {
  name: string;
  onEditClick: () => void;
};

const ProfileView: React.FC<ProfileViewProps> = ({ name, onEditClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="ml-2 text-xl">{name}</div>
      <EditIconButton onClick={onEditClick} />
    </div>
  );
};

export default ProfileView;
