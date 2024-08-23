import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ChatRoom from "./routes/ChatRoom";
import UnauthorizedPage from "../components/UnauthorizedPage";

const App = () => {
  const location = useLocation(); // Added to get current location

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
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<Navigate to="/login" />} />{" "}
    </Routes>
  );
};

export default App;
