// store/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubContact } from "../../types/subContact";

const initialState = {
  messages: [] as string[],
  inputValue: "",
  selectedChat: null as SubContact | null,
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
      console.log("action.payload", action.payload);
      if (action.payload) {
        state.selectedChat = action.payload;
      } else {
        state.selectedChat = null;
      }
    },
  },
});

export const { sendMessage, updateInputValue, updateSelectedChat } =
  chatSlice.actions;
export default chatSlice.reducer;
