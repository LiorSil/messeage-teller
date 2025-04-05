import React from "react";
import {useContact} from "../../../../hooks/useContact";
import Avatar from "../../../../shared/Avatar";

const UserProfile: React.FC = () => {
  const { contact, error } = useContact();

  if (error) {
    return (
      <p className="bg-app-palette-cool-gray-+90 border-2 border-red-600 text-red-500 text-center p-2 rounded">
        {error}
      </p>
    );
  }


  return (
    <Avatar
      href="#"
      avatarUrl={contact?.avatar}
      name={contact?.name}
      size={14} 
    />
  );
};

export default UserProfile;
