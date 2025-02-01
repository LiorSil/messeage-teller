import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../states/contactState";
import { Contact } from "../../types/contact";
import { fetchContact } from "../thunks/contactThunks";
import { SubContact, SubContactId } from "../../types/subContact";
import {
  fetchModifySubContact,
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
    ModifySubContact: (state, action: PayloadAction<SubContact>) => {
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
    builder.addCase(fetchModifySubContact.fulfilled, (state, action) => {
      console.log(action.payload);
      const { actionType, subContact, subContactId } = action.payload;

      if (state.contact?.subContacts) {
        if (actionType === "add" && subContact) {
          state.contact.subContacts.push(subContact);
        } else if (actionType === "delete" && subContactId) {
          state.contact.subContacts = state.contact.subContacts.filter(
            (sub) => sub._id !== subContactId
          );
        }
      }
    });

    builder.addCase(fetchModifySubContact.rejected, (state, action) => {
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

export { fetchContact, fetchModifySubContact, fetchContactByPhoneOrName };
export const { updateContact, updateName, ModifySubContact } =
  contactSlice.actions;
export default contactSlice.reducer;
