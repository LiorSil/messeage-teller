import { Message } from "./message";

export type Chat = {
  _id: string;
  participants: string[];
  messages: Message[];
};
