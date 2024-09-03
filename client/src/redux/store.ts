import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import userReducer from './slices/userSlice';

import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import contactSlice from "./slices/contactSlice";
import subContactFinderSlice from "./slices/subContactFinderSlice";

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  contact: contactSlice,
  subContact: subContactFinderSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
