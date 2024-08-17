import React, { useState } from "react";
import NavBarContainer from "./NavBarContainer";
import NavBarBrand from "./NavBarBrand";
import NavBarToggle from "./NavBarToggle";
import NavBarBackdrop from "./NavBarBackdrop";
import NavBarDrawer from "./NavBarDrawer";
import NavBarItem from "./NavBarItem";
import useSignOut from "../../../hooks/useSignOut";


const ChatListNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSignOut } = useSignOut();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id === "backdrop") {
      toggleMenu();
    }
  };

  return (
    <>
      <NavBarContainer>
        <NavBarBrand />
        <NavBarToggle isOpen={isOpen} toggleMenu={toggleMenu} />
        <NavBarBackdrop
          isOpen={isOpen}
          handleOutsideClick={handleOutsideClick}
        />
        <NavBarDrawer isOpen={isOpen}>
          <ul className="flex flex-col font-medium mt-4 rounded-lg">
            <NavBarItem href="#" label="Home" isActive />
            <NavBarItem href="#" label="Add Contact" />
            <NavBarItem href="#" label="Pricing" />
            <NavBarItem href="#" label="Contact" />
            <NavBarItem href="#" label="Sign Out" onClick={handleSignOut} />
          </ul>
        </NavBarDrawer>
      </NavBarContainer>
    </>
  );
};

export default ChatListNavBar;
