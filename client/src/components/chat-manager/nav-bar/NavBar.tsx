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
    <div className="flex flex-row justify-start sm:w-96 md:w-full p-2 ml-2  mt-2 rounded-md   bg-app-palette-sap-green-light-+30 border-2 border-app-palette-muted-turquoise--50">
      <div className="basis-1/4">
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
