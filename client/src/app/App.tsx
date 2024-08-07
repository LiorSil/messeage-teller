import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ChatRoom from "./routes/ChatRoom";

const App = () => {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route path="/about" element={<>About</>} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat-room" element={<ChatRoom />} />
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
};

export default App;
