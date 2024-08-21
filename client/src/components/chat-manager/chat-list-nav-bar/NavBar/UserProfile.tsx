import React from "react";
import useContact from "../../../../hooks/useContact";
import Loading from "../../../Loading";

const UserProfile: React.FC = () => {
  const { currentContact, loading, error } = useContact();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="bg-app-palette-cool-gray-+90 border-2 border-red-600 text-red-500 text-center p-2 rounded">
        {error}
      </p>
    );
  }

  return (
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img
        src={
          currentContact?.avatar || "https://flowbite.com/docs/images/logo.svg"
        }
        className="h-8 rounded-full"
        alt={currentContact?.name || "UserProfile Logo"}
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
        {currentContact?.name || "Guest"}
      </span>
    </a>
  );
};

export default UserProfile;
