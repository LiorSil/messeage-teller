import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ChatRoom from "./routes/ChatRoom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useEffect, useMemo } from "react";

const App = () => {
  const { userData } = useSelector((state: any) => state.auth);

  const { token, email, phoneNumber } = userData;
  const cookies = useMemo(() => new Cookies(), []);

  cookies.set("token", token, { path: "/" });
  cookies.set("email", email, { path: "/" });
  cookies.set("phoneNumber", phoneNumber, { path: "/" });

  useEffect(() => {
    if (token) {
      cookies.set("token", token, { path: "/" });
      cookies.set("email", email, { path: "/" });
      cookies.set("phoneNumber", phoneNumber, { path: "/" });
    }
  }, [token, email, phoneNumber, cookies]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login headline="Welcome Back!" />} />

      <Route path="/about" element={<>About</>} />
      <Route
        path="/register"
        element={<Register headline="Nice To Meet You!" />}
      />
      <Route path="/chat-room" element={<ChatRoom />} />
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
};

export default App;
