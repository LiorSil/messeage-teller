import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
import { SubContact } from "../../types/subContact";
import {
  Contact,
  FetchAddSubContactParams,
  FetchContactByPhoneOrNameParams,
  ContactResponse,
} from "../../types/contact";

interface ContactState {
  contact: Contact | null;
  loading: boolean;
  findContactLoading: boolean;
  error: string | null;
  phoneNumber: string;
  subContactPhoneNumber: string;
  subContacts: SubContact[];
  addContactSuccess: boolean;
}

const initialState: ContactState = {
  contact: {
    _id: "",
    name: "",
    phoneNumber: "",
    avatar: "",
    createdAt: "",
    contacts: [], // Ensure this is an empty array initially
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

const fetchContactByPhoneOrName = createAsyncThunk<
  SubContact[],
  FetchContactByPhoneOrNameParams
>("contact/fetchContactByPhoneOrName", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get<SubContact[]>(
      `${VITE_API_URL}/contacts/${data.phoneNumber}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data || "");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const fetchAddSubContact = createAsyncThunk<
  ContactResponse,
  FetchAddSubContactParams
>("contact/fetchAddSubContact", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put<ContactResponse>(
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

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
    builder.addCase(fetchContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.loading = false;
      state.contact = action.payload;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /** getContactByQuery */
    builder.addCase(fetchContactByPhoneOrName.fulfilled, (state, action) => {
      state.findContactLoading = false;

      const contacts = action.payload;

      // Filter the contacts
      state.subContacts = contacts.filter((contact: SubContact) => {
        return !state.contact?.contacts.some((subContact: SubContact) => {
          return subContact.phoneNumber === contact.phoneNumber;
        });
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
      const newContacts = Array.isArray(action.payload.contacts)
        ? action.payload.contacts
        : [];

      state.subContacts = state.subContacts.filter(
        (contact: SubContact) =>
          !newContacts.some(
            (payloadContact: SubContact) =>
              payloadContact.phoneNumber === contact.phoneNumber
          )
      );

      state.addContactSuccess = true;

      if (state.contact !== null) {
        state.contact.contacts = newContacts;
      }

      state.loading = false;
    });

    builder.addCase(fetchAddSubContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAddSubContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    });
  },
});

export { fetchContact, fetchContactByPhoneOrName, fetchAddSubContact };
export const { setPhoneNumber, clearAddContactSuccess } = contactSlice.actions;

export default contactSlice.reducer;
