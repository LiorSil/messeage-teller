import React, { useState } from "react";
import NavBarWrapper from "./NavBarWrapper";
import UserProfile from "./UserProfile";
import DrawerToggleButton from "./DrawerToggleButton";
import Backdrop from "./Backdrop";
import Drawer from "./Drawer";
import DrawerMenuLink from "./DrawerMenuLink";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <DrawerMenuLink href="#" label="Home" isActive={false} />
          <DrawerMenuLink href="#" label="Add Contact" isActive={false} />
          <DrawerMenuLink href="#" label="Pricing" />
          <DrawerMenuLink href="#" label="Contact" />
          <DrawerMenuLink href="#" label="Sign Out" />
        </ul>
      </Drawer>
    </NavBarWrapper>
  );
};

export default NavBar;
