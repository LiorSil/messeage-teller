import React from "react";
import avatar from "../../../assets/avatars/profile-avatar.jpg";

const Profile: React.FC = () => {
  return (
    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-solid border-app-palette-sap-green-light--50">
      <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
    </div>
  );
};

export default Profile;
