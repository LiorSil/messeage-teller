import React from "react";
import useContact from "../../../hooks/useContact";
import Loading from "../../Loading";

const NavBarBrand: React.FC = () => {
  const { contact, loading, error } = useContact();

  return (
    <>
      {loading && <Loading />}
      {error && (
        <p className="bg-app-palette-cool-gray-+90 border-2 border-red-600 text-red-500 text-center">
          {error}
        </p>
      )}
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Flowbite Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          {contact?.name}
        </span>
      </a>
    </>
  );
};

export default NavBarBrand;
