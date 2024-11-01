import React, { useState } from "react";
import NavBarWrapper from "./NavBarWrapper";
import UserProfile from "./UserProfile";
import DrawerToggleButton from "./DrawerToggleButton";
import Backdrop from "./Backdrop";
import Drawer from "./Drawer";
import DrawerMenuLink from "./DrawerMenuLink";
import AddContact from "../add-contact/AddContact.tsx"; // Import your components
import SignOut from "../sign-out/SignOut";
import Profile from "../profile/Profile";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string>("Home");
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id === "backdrop") {
      toggleMenu();
    }
  };

  const handleCancelSignOut = () => {
    setSelectedComponent(null);
  };

  const handleLinkClick = (label: string) => {
    setSelectedLink(label);
    switch (label) {
      case "Add Contact":
        setSelectedComponent(<AddContact />);
        break;

      case "Sign Out":
        setSelectedComponent(<SignOut onCancel={handleCancelSignOut} />);
        break;
      case "Profile":
        setSelectedComponent(<Profile />);
        break;

      // Add more cases for other components
      default:
        setSelectedComponent(null);
    }
  };

  return (
    <NavBarWrapper>
      <UserProfile />
      <DrawerToggleButton isOpen={isOpen} onToggle={toggleMenu} />
      {isOpen && <Backdrop handleOutsideClick={onBackdropClick} />}
      <Drawer isOpen={isOpen} selectedComponent={selectedComponent}>
        <ul className="flex flex-col font-medium mt-4 rounded-lg">
          <DrawerMenuLink
            href="#"
            label="Home"
            isActive={selectedLink === "Home"}
            onSelect={() => handleLinkClick("Home")}
          />
          <DrawerMenuLink
            href="#"
            label="Add Contact"
            isActive={selectedLink === "Add Contact"}
            onSelect={() => handleLinkClick("Add Contact")}
          />

          <DrawerMenuLink
            href="#"
            label="Profile"
            isActive={selectedLink === "Profile"}
            onSelect={() => handleLinkClick("Profile")}
          />
          <DrawerMenuLink
            href="#"
            label="Sign Out"
            onSelect={() => handleLinkClick("Sign Out")}
          />
        </ul>
      </Drawer>
    </NavBarWrapper>
  );
};

export default NavBar;
