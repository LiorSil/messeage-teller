import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

import { useNavigate } from "react-router-dom";

const useSignOut = () => {
 
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = () => {
    navigate("/login");
  };

  return { handleSignOut, loading, error, success };
};

export default useSignOut;
