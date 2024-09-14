// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubContact } from "../../types/subContact";

import { getChatByParticipantsIds } from "../thunks/chatThunks";
import { Chat } from "../../types/chat";
import { getMessagesForSubContact } from "../selectors/chatSelector";
import { Message } from "../../types/message";

const initialState = {
  messages: [] as Message[],
  inputValue: "",
  selectedChat: null as SubContact | null,
  chats: [] as Chat[],
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
      } else {
        state.selectedChat = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatByParticipantsIds.fulfilled, (state, action) => {
      state.chats = action.payload;
      const messages = getMessagesForSubContact(
        state.chats,
        state.selectedChat as SubContact
      );
      state.messages = messages || [];
    });
    builder.addCase(getChatByParticipantsIds.rejected, () => {});
    builder.addCase(getChatByParticipantsIds.pending, () => {});
  },
});

export const { updateInputValue, updateSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
