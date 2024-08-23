import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const useSignOut = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("handleSignOut called");
    cookies.remove("token");
    navigate("/login", { replace: true });
  };

  return { handleSignOut };
};
