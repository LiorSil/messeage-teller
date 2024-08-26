// contactState.ts
import { Contact } from "../../types/contact";

export interface ContactState {
  contact: Contact | null;
  loading: boolean;
  error: string | null;
  getContactLoading: boolean;
  phoneNumber: string;
  addContactSuccess: boolean;
}
