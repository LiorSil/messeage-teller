import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface SubContact {
  _id: string;
  name: string;
  phoneNumber: string;
  imageUrl: string;
  lastMessage: string;
}

interface Contact {
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  contacts: SubContact[];
}

interface ContactState {
  currentContact: Contact | null;
  loading: boolean;
  findContactLoading: boolean;
  error: string | null;
  phoneNumber: string;
  subContactPhoneNumber: string;
  subContacts: SubContact[];
  addContactSuccess: boolean;
}

const initialState: ContactState = {
  currentContact: {
    name: "",
    phoneNumber: "",
    createdAt: "",
    contacts: [],
    updatedAt: "",
  },
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

const fetchContactByPhoneOrName = createAsyncThunk(
  "contact/fetchContactByPhoneOrName",
  async (data: { token: string; phoneNumber: string }) => {
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
    clearAddContactSuccess: (state) => {
      state.addContactSuccess = false;
    },
  },
  extraReducers: (builder) => {
    /** fetchContact  */

    builder.addCase(fetchContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.loading = false;
      state.currentContact = action.payload;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /** getContactByPhoneNumber */
    builder.addCase(fetchContactByPhoneOrName.fulfilled, (state, action) => {
      state.findContactLoading = false;
      state.subContacts = action.payload.filter((contact: SubContact) => {
        return !state.currentContact?.contacts.some(
          (subContact: SubContact) => {
            return subContact.phoneNumber === contact.phoneNumber;
          }
        );
      });
    });
    builder.addCase(fetchContactByPhoneOrName.pending, (state) => {
      state.findContactLoading = true;
    });
    builder.addCase(fetchContactByPhoneOrName.rejected, (state, action) => {
      state.findContactLoading = false;
      state.error = action.payload as string;
    });

    /** fetchAddSubContact */
    builder.addCase(fetchAddSubContact.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);

      // Filter out subContacts that are present in action.payload
      state.subContacts = state.subContacts.filter(
        (contact: SubContact) =>
          !action.payload.contacts.some(
            (payloadContact: SubContact) =>
              payloadContact.phoneNumber === contact.phoneNumber
          )
      );
      state.addContactSuccess = true;
      if (state.currentContact !== null) {
        state.currentContact.contacts = action.payload.contacts;
      }

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

export { fetchContact, fetchContactByPhoneOrName, fetchAddSubContact };
export const { setPhoneNumber, clearAddContactSuccess } = contactSlice.actions;

export default contactSlice.reducer;
