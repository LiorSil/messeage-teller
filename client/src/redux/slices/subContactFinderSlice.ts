import { createSlice } from "@reduxjs/toolkit";

import { SubContact } from "../../types/subContact";
import { SubContactState } from "../states/subContactState";
import { fetchContactByPhoneOrName } from "../thunks/subContactThunks";

const initialState: SubContactState = {
  subContactPhoneNumber: "",
  subContacts: [],
  loading: false,
  error: "",
};

const subContactsFinderSlice = createSlice({
  name: "subContactsFinder",
  initialState,
  reducers: {
    updateSubContacts: (state, action) => {
      //action.payload is array of subContacts that we need to drop from subContacts array in state
      state.subContacts = state.subContacts.filter(
        (subContact) =>
          !action.payload.some(
            (subContactToRemove: SubContact) =>
              subContactToRemove.phoneNumber === subContact.phoneNumber
          )
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactByPhoneOrName.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.loading = false;
      state.subContacts = action.payload;
    });
    builder.addCase(fetchContactByPhoneOrName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContactByPhoneOrName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { updateSubContacts } = subContactsFinderSlice.actions;
export default subContactsFinderSlice.reducer;
