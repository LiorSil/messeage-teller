import { useMemo } from "react";

import { BASE_CHAT_CLASS } from "../utils/styles/tailwindClasses";

export const useChatRoom = () => {
  const getClassNames = useMemo(
    () => (isSelected: boolean, mdWidth: string) => {
      return `${BASE_CHAT_CLASS} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
    },
    []
  );

  return {
    getClassNames,
  };
};
