import { createAsyncThunk } from "@reduxjs/toolkit";

import { FetchChatsArgs, FetchChatsResponse } from "../states/chatState.ts";
import axiosInstance from "../../api/axiosInstance.ts";

const getSelectedChatMessages = createAsyncThunk<
  FetchChatsResponse,
  FetchChatsArgs
>("chat/getContactChats", async ({ subContact }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/chats/chatsByParticipants`, {
      params: {
        subContactId: subContact._id,
      },
    });
    console.log("response", response.data.messages);
    return {
      messages: response.data.messages,
      selectedChat: subContact,
    };
  } catch (error) {
    return rejectWithValue("Failed to fetch chat messages");
  }
});

export { getSelectedChatMessages };
