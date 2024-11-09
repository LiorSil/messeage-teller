import { createSlice } from "@reduxjs/toolkit";

import { SubContactState } from "../states/subContactState";
import { fetchContactByPhoneOrName } from "../thunks/subContactThunks";

const initialState: SubContactState = {
  subContactPhoneNumber: "",
  subContacts: [],
  loading: false,
  error: "",
  query: "",
};

const subContactsFinderSlice = createSlice({
  name: "subContactsFinder",
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    clearQuery: (state) => {
      state.query = "";
    },
  },
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

export const { updateQuery, clearQuery } = subContactsFinderSlice.actions;
export default subContactsFinderSlice.reducer;
