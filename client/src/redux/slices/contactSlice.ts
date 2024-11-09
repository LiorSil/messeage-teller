import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../states/contactState";
import { Contact } from "../../types/contact";
import { fetchContact } from "../thunks/contactThunks";
import { SubContact } from "../../types/subContact";
import { fetchAddSubContact } from "../thunks/subContactThunks";

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action: PayloadAction<Contact | undefined>) => {
      if (action.payload) state.contact = action.payload;
    },
    addSubContact: (state, action: PayloadAction<SubContact>) => {
      state.contact?.subContacts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.getContactLoading = false;
      state.contact = action.payload;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.contact = initialState.contact;
      state.getContactLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchAddSubContact.fulfilled, (state, action) => {
      state.contact?.subContacts.push(action.payload);
    });
    builder.addCase(fetchAddSubContact.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export { fetchContact, fetchAddSubContact };
export const { updateContact, addSubContact } = contactSlice.actions;
export default contactSlice.reducer;
