import { SubContact } from "../../types/subContact";

export interface SubContactState {
  subContactPhoneNumber: string;
  subContacts: SubContact[];
  loading: boolean;
  error: string;
}
