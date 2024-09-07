import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SubContact } from "../../types/subContact";
import { FetchContactByPhoneOrNameParams } from "../../types/contact";
import { SubContactState } from "../states/subContactState";
const VITE_API_URL = import.meta.env.VITE_API_URL;

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

export const fetchContactByPhoneOrName = createAsyncThunk<
  SubContact[],
  FetchContactByPhoneOrNameParams
>(
  "subContactsFinder/fetchContactByPhoneOrName",
  async (data, { rejectWithValue }) => {
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
  }
);

export const { updateSubContacts } = subContactsFinderSlice.actions;
export default subContactsFinderSlice.reducer;
