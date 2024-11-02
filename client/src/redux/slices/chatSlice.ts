// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getContactChats } from "../thunks/chatThunks";
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
  },
  extraReducers: (builder) => {
    builder.addCase(getContactChats.fulfilled, (state, action) => {
      state.messages = action.payload.messages || [];
      state.selectedChat = action.payload.selectedChat;
    });
    builder.addCase(getContactChats.rejected, (state,_) => {
      state.selectedChat = null;
    });
    builder.addCase(getContactChats.pending, () => {});
  },
});

export const { updateInputValue,  toggleChatManagerView } =
  chatSlice.actions;
export default chatSlice.reducer;
