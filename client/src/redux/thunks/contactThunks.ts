import { createAsyncThunk } from "@reduxjs/toolkit";
import { AckNotificationArgs, Contact } from "../../types/contact";
import axiosInstance from "../../api/axiosInstance.ts";
import { handleAxiosError } from "../../utils/handleAxiosError.ts";

const fetchContact = createAsyncThunk<Contact, void, { rejectValue: any }>(
  "contact/fetchContact",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Contact>("/contacts");

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
  async ({ fromId, recipientId }, { rejectWithValue }) => {
    try {
      await axiosInstance.put<void>("/notifications/removeNotification", {
        fromId,
        recipientId,
      });
    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  },
);

export { fetchContact, acknowledgeNotification };
