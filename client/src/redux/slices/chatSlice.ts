// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubContact } from "../../types/subContact";

import { getContactChats } from "../thunks/chatThunks";
import { Chat } from "../../types/chat";
import { getMessagesForSubContact } from "../selectors/chatSelector";
import { Message } from "../../types/message";

const initialState = {
  messages: [] as Message[],
  inputValue: "",
  selectedChat: null as SubContact | null,
  chats: [] as Chat[],
  isChatMangerView: true,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    updateSelectedChat: (state, action: PayloadAction<SubContact | null>) => {
      if (action.payload) {
        state.selectedChat = action.payload;
        state.messages =
          getMessagesForSubContact(state.chats, action.payload) || [];
      } else {
        state.selectedChat = null;
      }
    },
    toggleChatManagerView: (state) => {
      state.isChatMangerView = !state.isChatMangerView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContactChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      const messages = getMessagesForSubContact(
        state.chats,
        state.selectedChat as SubContact
      );
      state.messages = messages || [];
    });
    builder.addCase(getContactChats.rejected, () => {});
    builder.addCase(getContactChats.pending, () => {});
  },
});

export const { updateInputValue, updateSelectedChat, toggleChatManagerView } =
  chatSlice.actions;
export default chatSlice.reducer;
