import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactState } from "../states/contactState";

import { Contact } from "../../types/contact";
import { fetchContact } from "../thunks/contactThunks";

const initialState: ContactState = {
  contact: {
    _id: "",
    name: "",
    phoneNumber: "",
    avatar: "",
    createdAt: "",
    subContacts: [],
    updatedAt: "",
  },
  loading: false,
  phoneNumber: "",
  getContactLoading: false,
  error: "",
  addContactSuccess: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.contact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContact.pending, (state) => {
      state.getContactLoading = true;
    });
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.getContactLoading = false;
      state.contact = action.payload;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.getContactLoading = false;
      state.error = action.payload as string;
    });
  },
});

export { fetchContact };
export const { updateContact } = contactSlice.actions;
export default contactSlice.reducer;
