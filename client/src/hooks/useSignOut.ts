import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return { handleSignOut, loading, error, success };
};

export default useSignOut;
