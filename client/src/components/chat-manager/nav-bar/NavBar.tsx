import React, { ReactNode } from "react";
import Profile from "./Profile";
import Status from "./Status";
import FindNewChat from "./new-chat/FindNewChat";

type Props = {
  children?: ReactNode;
  onSelectChat: (chatId: string) => void;
};

const NavBar: React.FC<Props> = ({ onSelectChat }) => {
  return (
    <div className="flex flex-col pl-3 rounded-2xl md:flex-row m-3 p-2 bg-app-palette-sap-green-light-+30 justify-between border-sold border-app-palette-muted-turquoise--50 border-2">
      <div className="flex items-center ">
        <Profile />
        <Status />
      </div>
      <div className="flex items-center ml-auto ">
        <FindNewChat />
      </div>
    </div>
  );
};

export default NavBar;
