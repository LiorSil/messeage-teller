import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import { AppDispatch } from "../redux/store";
import { clearQuery } from "../redux/slices/subContactFinderSlice";
import { clearChatState } from "../redux/slices/chatSlice";
import { clearContactState } from "../redux/slices/contactSlice";

export const useSignOut = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("handleSignOut called");
    dispatch(clearQuery());
    dispatch(clearChatState());
    dispatch(clearContactState());

    cookies.remove("token");
    navigate("/login", { replace: true });
  };

  return { handleSignOut };
};
