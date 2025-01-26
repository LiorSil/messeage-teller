import express from "express";
import dbConnect from "./config/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { initializeSocket } from "./sockets/websocket";

import contactRoute from "./routes/contact.route";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import chatRoute from "./routes/chat.route";
import notificationRoute from "./routes/notification.route";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
dbConnect();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello World!");
});

app.use("/notifications", notificationRoute);
app.use("/contacts", contactRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/chats", chatRoute);

// Initialize Socket.io with the server
initializeSocket(server);

// Use `server.listen` instead of `app.listen` since we're now using the HTTP server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
