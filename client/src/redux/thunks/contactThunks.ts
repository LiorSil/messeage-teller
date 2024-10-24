import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import { AckNotificationArgs, Contact } from "../../types/contact";


/**
 * Async thunk for fetching a contact
 * @param token - The token to authenticate the request
 * @returns The response data from the API
 * @throws The error message from the API response or a generic error message
 */

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
      console.log("error", error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);


const acknowledgeNotification = createAsyncThunk<void, AckNotificationArgs>(
  "contact/acknowledgeNotification",
  async ({ token, fromId, recipientId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${VITE_API_URL}/notifications/removeNotification`,
        { fromId, recipientId },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // If you need to return anything useful (can be `void` too).
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to acknowledge notification"
      );
    }
  }
);

export { fetchContact, acknowledgeNotification };
