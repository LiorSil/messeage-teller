import { createAsyncThunk } from "@reduxjs/toolkit";
import { AckNotificationArgs, Contact } from "../../types/contact";
import axiosInstance from "../../api/axiosInstance.ts";
import { handleAxiosError } from "../../utils/handleAxiosError.ts";

const fetchContact = createAsyncThunk<Contact, void, { rejectValue: any }>(
  "contact/fetchContact",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Contact>("/contacts");
      console.log("contact", data);
      return data;

    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  },
);

const acknowledgeNotification = createAsyncThunk<
  void,
  AckNotificationArgs,
  { rejectValue: any }
>(
  "contact/acknowledgeNotification",
  async ({ contactId, subContactNotification }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        "/notifications/acknowledgeNotification",
        {
          contactId,
          subContactNotification,
        },
      );
      return resp.data;
    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  },
);

export { fetchContact, acknowledgeNotification };
