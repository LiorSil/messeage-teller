import { createSlice } from "@reduxjs/toolkit";

import { SubContactState } from "../states/subContactState";

const initialState: SubContactState = {

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
});

export const { updateQuery, clearQuery } = subContactsFinderSlice.actions;
export default subContactsFinderSlice.reducer;
