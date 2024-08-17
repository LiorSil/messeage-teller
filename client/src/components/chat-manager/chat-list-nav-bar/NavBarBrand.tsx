import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const NavBarBrand: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  console.log(userData);

  return (
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="Flowbite Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
        {userData?.contact?.name}
      </span>
    </a>
  );
};

export default NavBarBrand;
