import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../states/contactState";
import { Contact } from "../../types/contact";
import { fetchContact } from "../thunks/contactThunks";

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action: PayloadAction<Contact | undefined>) => {
      if (action.payload) state.contact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.getContactLoading = false;
      state.contact = action.payload;
    });
    builder.addCase(fetchContact.pending, (state) => {
      state.getContactLoading = true;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.contact = initialState.contact;
      state.getContactLoading = false;
      state.error = action.payload as string;
    });
  },
});

export { fetchContact };
export const { updateContact } = contactSlice.actions;
export default contactSlice.reducer;
