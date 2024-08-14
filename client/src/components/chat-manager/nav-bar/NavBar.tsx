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
    <div className="flex flex-row justify-start   p-2 mx-4 mt-2 rounded-md   bg-app-palette-sap-green-light-+30 border-2 border-app-palette-muted-turquoise--50">
      <div className="basis-1/4 ml-auto ">
        <Profile />
      </div>
      <div className="basis-1/4">
        <Status />
      </div>
      <div className=" basic-1/2 ml-auto    ">
        <FindNewChat />
      </div>
    </div>
  );
};

export default NavBar;
