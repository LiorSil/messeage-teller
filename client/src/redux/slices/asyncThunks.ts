import { createAsyncThunk } from "@reduxjs/toolkit";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { Chat } from "../../types/chat";

const getChatByParticipantsIds = createAsyncThunk<Chat[], string>(
  "chat/getChatByParticipantsIds",
  async (participantsIds) => {
    const response = await axios.get(
      `${VITE_API_URL}/chats/chatsByParticipants`,
      {
        params: {
          participants: participantsIds, // Send as query parameter
        },
      }
    );
    return response.data;
  }
);

export { getChatByParticipantsIds };
