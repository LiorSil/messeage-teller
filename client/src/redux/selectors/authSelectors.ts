import { createSelector } from "reselect";

// Simple selector to get a piece of state
const selectAuth = (state: any) => state.auth;

// Memoized selector using reselect
export const selectToken = createSelector([selectAuth], (auth) => auth.token);
