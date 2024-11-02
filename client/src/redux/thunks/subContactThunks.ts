import { createAsyncThunk } from "@reduxjs/toolkit";
import { SubContact } from "../../types/subContact";
import { FetchContactByPhoneOrNameParams } from "../../types/contact";
import axiosInstance from "../../api/axiosInstance.ts";
import { handleAxiosError } from "../../utils/handleAxiosError.ts";

/**
 * Async thunk for fetching a contact by phone number or name
 * @param data - The data to fetch a contact by phone number or name
 * @returns The response data from the API
 * @throws The error message from the API response or a generic error message
 */

const fetchContactByPhoneOrName = createAsyncThunk<
  SubContact[],
  FetchContactByPhoneOrNameParams,
  { rejectValue: any }
>(
  "subContactsFinder/fetchContactByPhoneOrName",
  async ({ query }, { rejectWithValue }) => {
    try {
      console.log("query", query);
      const response = await axiosInstance.get<SubContact[]>(
        `/contacts/${query}`,
      );
      return response.data;
    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  },
);

export { fetchContactByPhoneOrName };
