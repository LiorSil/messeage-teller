import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ChatRoom from "./routes/ChatRoom";
import UnauthorizedPage from "../shared/UnauthorizedPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<Login headline="Welcome Back!" />} />
      <Route path="about" element={<>About</>} />
      <Route path="register" element={<Register />} />
      <Route path="chat-room" element={<ChatRoom />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default App;
