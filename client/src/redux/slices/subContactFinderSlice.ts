import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContactByPhoneOrName.fulfilled, (state, action) => {
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

export default subContactsFinderSlice.reducer;
