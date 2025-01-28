import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../states/contactState";
import { Contact } from "../../types/contact";
import { fetchContact } from "../thunks/contactThunks";
import { SubContact } from "../../types/subContact";
import {
  fetchAddSubContact,
  fetchContactByPhoneOrName,
} from "../thunks/subContactThunks";

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action: PayloadAction<Contact | undefined>) => {
      if (action.payload) state.contact = action.payload;
    },
    updateName: (state, action: PayloadAction<string>) => {
      console.log("action.payload", action.payload);
      state.contact!.name = action.payload;
    },
    addSubContact: (state, action: PayloadAction<SubContact>) => {
      state.contact?.subContacts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // * get contact
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.contact = action.payload;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.contact = initialState.contact;
      state.error = action.payload as string;
    });
    // * add sub contact
    builder.addCase(fetchAddSubContact.fulfilled, (state, action) => {
      state.contact?.subContacts.push(action.payload);
    });
    builder.addCase(fetchAddSubContact.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    // * potential subContacts finder
    builder.addCase(fetchContactByPhoneOrName.fulfilled, (state, action) => {
      state.potentialSubContacts = action.payload;
    });
    builder.addCase(fetchContactByPhoneOrName.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export { fetchContact, fetchAddSubContact, fetchContactByPhoneOrName };
export const { updateContact, updateName, addSubContact } =
  contactSlice.actions;
export default contactSlice.reducer;
