// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSelectedChatMessages } from "../thunks/chatThunks";
import { initialState } from "../states/chatState";

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    toggleChatManagerView: (state) => {
      
      state.isChatMangerView = !state.isChatMangerView;
    },
    clearChatState: (state) => {
      state.inputValue = initialState.inputValue;
      state.selectedChat = initialState.selectedChat;
      state.messages= initialState.messages;
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(getSelectedChatMessages.fulfilled, (state, action) => {
      state.messages = action.payload?.messages || [];
      state.selectedChat = action.payload.selectedChat;
    });
    builder.addCase(getSelectedChatMessages.rejected, (state, _) => {
      state.selectedChat = null;
    });
    builder.addCase(getSelectedChatMessages.pending, () => {});
  },
});

export const { updateInputValue, toggleChatManagerView, clearChatState } =
  chatSlice.actions;
export default chatSlice.reducer;
