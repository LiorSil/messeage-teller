import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import userReducer from './slices/userSlice';

import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
