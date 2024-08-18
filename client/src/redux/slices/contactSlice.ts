import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  contact: {},
  loading: false,
  findContactLoading: false,
  error: "",
  phoneNumber: "",
  subContactPhoneNumber: "",
  subContacts: [],
  addContactSuccess: false,
};

// Async thunk for fetching filtered by user's entered phone number contacts
const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async (token: string) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const fetchContactByPhoneNumber = createAsyncThunk(
  "contact/fetchContactByPhoneNumber",
  async (data: { token: string; phoneNumber: string }) => {
    console.log("data", data);
    try {
      const response = await axios.get(
        `${VITE_API_URL}/contacts/${data.phoneNumber}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle and return the error response
      if (error.response) {
        return error.response.data;
      }
      throw error; // Re-throw if it's a different kind of error (e.g., network error)
    }
  }
);

const fetchAddSubContact = createAsyncThunk(
  "contact/fetchAddSubContact",
  async (data: { token: string; newSubContactNumber: string }) => {
    try {
      const response = await axios.put(
        `${VITE_API_URL}/contacts/addSubContact`,
        {
          phoneNumber: data.newSubContactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.subContactPhoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    /** fetchContact  */

    builder.addCase(fetchContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /** getContactByPhoneNumber */
    builder.addCase(fetchContactByPhoneNumber.fulfilled, (state, action) => {
      state.findContactLoading = false;
      state.subContacts = action.payload;
    });
    builder.addCase(fetchContactByPhoneNumber.pending, (state) => {
      state.findContactLoading = true;
    });
    builder.addCase(fetchContactByPhoneNumber.rejected, (state, action) => {
      state.findContactLoading = false;
      state.error = action.payload as string;
    });

    /** fetchAddSubContact */
    builder.addCase(fetchAddSubContact.fulfilled, (state, action) => {
      state.addContactSuccess = true;
      state.loading = false;
    });

    builder.addCase(fetchAddSubContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAddSubContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { fetchContact, fetchContactByPhoneNumber, fetchAddSubContact };
export const { setPhoneNumber } = contactSlice.actions;

export default contactSlice.reducer;
