import React, { useState } from "react";
import NavBarWrapper from "./NavBar/NavBarWrapper";
import UserProfile from "./NavBar/UserProfile";
import DrawerToggleButton from "./NavBar/DrawerToggleButton";
import Backdrop from "./NavBar/Backdrop";
import Drawer from "./NavBar/Drawer";
import DrawerMenuItem from "./NavBar/DrawerMenuLink";
import useSignOut from "../../../hooks/useSignOut";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSignOut } = useSignOut();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id === "backdrop") {
      toggleMenu();
    }
  };

  return (
    <NavBarWrapper>
      <UserProfile />
      <DrawerToggleButton isOpen={isOpen} onToggle={toggleMenu} />
      {isOpen && <Backdrop handleOutsideClick={onBackdropClick} />}
      <Drawer isOpen={isOpen}>
        <ul className="flex flex-col font-medium mt-4 rounded-lg">
          <DrawerMenuItem href="#" label="Home" isActive />
          <DrawerMenuItem href="#" label="Add Contact" />
          <DrawerMenuItem href="#" label="Pricing" />
          <DrawerMenuItem href="#" label="Contact" />
          <DrawerMenuItem href="#" label="Sign Out" onClick={handleSignOut} />
        </ul>
      </Drawer>
    </NavBarWrapper>
  );
};

export default NavBar;
