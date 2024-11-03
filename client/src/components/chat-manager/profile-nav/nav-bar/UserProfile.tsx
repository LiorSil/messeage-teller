import React from "react";
import useContact from "../../../../hooks/useContact";
import Loading from "../../../../shared/Loading";

const UserProfile: React.FC = () => {
  const { contact, loading, error } = useContact();
  console.log("UserProfile.tsx: contact:", contact);

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
        src={contact?.avatar || "https://flowbite.com/docs/images/logo.svg"}
        className="w-14 h-14 rounded-full border-2 border-black object-cover object-center"
        alt={contact?.name || "UserProfile Logo"}
      />
      <span className="self-center md:text-xl lg:text-2xl font-semibold whitespace-nowrap text-white">
        {contact?.name || "Guest"}
      </span>
    </a>
  );
};

export default UserProfile;
