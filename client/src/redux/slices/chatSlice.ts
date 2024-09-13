// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubContact } from "../../types/subContact";

import { getChatByParticipantsIds } from "./asyncThunks";
import { Chat } from "../../types/chat";

const initialState = {
  messages: [] as string[],
  inputValue: "",
  selectedChat: null as SubContact | null,
  chats: [] as Chat[],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state) => {
      if (state.inputValue.trim()) {
        state.messages.push(state.inputValue);
        state.inputValue = ""; // Clear the input field after sending a message
      }
    },
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    updateSelectedChat: (state, action: PayloadAction<SubContact | null>) => {
      if (action.payload) {
        state.selectedChat = action.payload;
      } else {
        state.selectedChat = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatByParticipantsIds.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(getChatByParticipantsIds.rejected, (state, action) => {
      console.error("Failed to fetch chats:", action.payload);
    });
    builder.addCase(getChatByParticipantsIds.pending, () => {
      console.log("Fetching chats, pending...");
    });
  },
});

export const { sendMessage, updateInputValue, updateSelectedChat } =
  chatSlice.actions;
export default chatSlice.reducer;
