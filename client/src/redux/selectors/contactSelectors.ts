import { createSelector } from "reselect";
import { RootState } from "../store";
import { ContactState } from "../states/contactState";

// Basic selectors
const selectContactState = (state: RootState): ContactState => state.contact;

export const selectContact = createSelector(
  [selectContactState],
  (contactState) => contactState.contact
);

export const selectLoading = createSelector(
  [selectContactState],
  (contactState) => contactState.loading
);

export const selectError = createSelector(
  [selectContactState],
  (contactState) => contactState.error
);

// You can also create a combined selector if necessary
export const selectContactData = createSelector(
  [selectContact, selectLoading, selectError],
  (contact, loading, error) => ({
    contact,
    loading,
    error,
  })
);
