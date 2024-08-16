import express from "express";
import dbConnect from "./config/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { initializeSocket } from "./config/socket";

import contactRoute from "./routes/contactRoute";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
dbConnect();
initializeSocket(server);

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello World!");
});

app.use("/contacts", contactRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
