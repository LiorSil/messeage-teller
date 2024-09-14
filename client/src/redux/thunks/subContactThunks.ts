import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SubContact } from "../../types/subContact";
import { FetchContactByPhoneOrNameParams } from "../../types/contact";
const VITE_API_URL = import.meta.env.VITE_API_URL;

/**
 * Async thunk for fetching a contact by phone number or name
 * @param data - The data to fetch a contact by phone number or name
 * @returns The response data from the API
 * @throws The error message from the API response or a generic error message
 */

const fetchContactByPhoneOrName = createAsyncThunk<
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

export { fetchContactByPhoneOrName };
