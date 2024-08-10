import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  contacts: [],
  loading: false,
  error: "",
};

// Async thunk for fetching filtered by user's entered phone number contacts
export const fetchContacts = createAsyncThunk("contact/fetchContacts", async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/contacts/`);
    console.log("response", response);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
});

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default contactSlice.reducer;
