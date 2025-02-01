import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchModifySubContactParams,
  SubContact,
} from "../../types/subContact";
import {
  fetchModifySubContactParams,
  FetchContactByPhoneOrNameParams,
} from "../../types/contact";
import axiosInstance from "../../api/axiosInstance.ts";
import { handleAxiosError } from "../../utils/handleAxiosError.ts";

/**
 * Async thunk for fetching a contact by phone number or name
 * @param data - The data to fetch a contact by phone number or name
 * @returns The response data from the API
 * @throws The error message from the API response or a generic error message
 */

export const fetchContactByPhoneOrName = createAsyncThunk<
  SubContact[],
  FetchContactByPhoneOrNameParams,
  { rejectValue: any }
>(
  "subContactsFinder/fetchContactByPhoneOrName",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<SubContact[]>(
        `/contacts/${query}`
      );
      return response.data;
    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  }
);
export const fetchModifySubContact = createAsyncThunk<
  SubContact,
  FetchModifySubContactParams,
  { rejectValue: unknown }
>(
  "subContactsFinder/fetchModifySubContact",
  async ({ subContactId, actionType }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<SubContact>(
        `/contacts/fetchModifySubContact`,
        {
          data: { subContactId, actionType },
        }
      );

      // Return both the subContact data and the actionType
      return { ...response.data, actionType };
    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  }
);
