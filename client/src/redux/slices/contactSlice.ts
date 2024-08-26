import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContactState } from "../states/contactState";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import { Contact } from "../../types/contact";

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

// Async thunk for fetching filtered by user's entered phone number contacts
const fetchContact = createAsyncThunk<Contact, string>(
  "contact/fetchContact",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Contact>(`${VITE_API_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
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
export default contactSlice.reducer;
