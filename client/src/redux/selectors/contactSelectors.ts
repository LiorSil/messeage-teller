import { createSelector } from "reselect";
import { RootState } from "../store";
import { ContactState } from "../slices/contactSlice";

// Basic selectors
const selectContactState = (state: RootState): ContactState => state.contact;

export const selectContact = createSelector(
  [selectContactState],
  (contactState) => contactState.contact
);

export const selectSubContacts = createSelector(
  [selectContactState],
  (contactState) => contactState.subContacts
);

export const selectLoading = createSelector(
  [selectContactState],
  (contactState) => contactState.loading
);

// You can also create a combined selector if necessary
export const selectContactData = createSelector(
  [selectContact, selectSubContacts, selectLoading],
  (contact, subContacts, getContactLoading) => ({
    contact,
    subContacts,
    getContactLoading,
  })
);
