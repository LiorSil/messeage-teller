import { Action, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchModifySubContactParams,
  FetchModifySubContactResponse,
  SubContact,
  SubContactId,
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
  FetchModifySubContactResponse,
  FetchModifySubContactParams,
  { rejectValue: unknown }
>(
  "subContactsFinder/fetchModifySubContact",
  async ({ subContactId, actionType }, { rejectWithValue }) => {
    try {
      // Corrected the axiosInstance.put syntax to directly pass the data payload
      const response = await axiosInstance.put<SubContact>(
        `/contacts/fetchModifySubContact`,
        { subContactId, actionType } 
      );

      // Ensure the return type includes the actionType and either subContact or subContactId
      return { ...response.data, actionType, subContactId };
    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  }
);
