import { createAsyncThunk } from "@reduxjs/toolkit";
import { AckNotificationArgs, Contact } from "../../types/contact";
import axiosInstance from "../../api/axiosInstance.ts";
import { handleAxiosError } from "../../utils/handleAxiosError.ts";
import { Notification } from "../../types/notification.ts";
import { SubContact } from "../../types/subContact.ts";

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
  }
);

const acknowledgeNotification = createAsyncThunk<
  void,
  AckNotificationArgs,
  { rejectValue: any }
>(
  "contact/acknowledgeNotification",
  async ({ contactId, subContactId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        "/notifications/acknowledgeNotification",
        {
          contactId,
          subContactId,
        }
      );
      return resp.data;
    } catch (error) {
      return handleAxiosError(error, rejectWithValue);
    }
  }
);

const markIncomingMessages = (
  notificationsIds: Notification,
  subContacts: SubContact[]
): SubContact[] => {
  const notificationsSet = new Set(notificationsIds.contactNotifications);
  const updatedSubContacts = subContacts.map((subContact) => ({
    ...subContact,
    sIncomingMessage: notificationsSet.has(subContact._id),
  }));
  return updatedSubContacts;
};

export { fetchContact, acknowledgeNotification, markIncomingMessages };
