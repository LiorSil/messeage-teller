import { Chat } from "../../types/chat";
import { createAsyncThunk } from "@reduxjs/toolkit";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

/**

/**
 * Get chat by participants ids using async thunk
 * @param participantsIds : string (ids of participants)
 * @returns
 */

const getContactChats = createAsyncThunk<Chat[], string>(
  "chat/getContactChats",
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

export { getContactChats };
