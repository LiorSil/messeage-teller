import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks/authThunks";

const initialState = {
  token: "",
  loading: false,
  error: "",
  redirectTo: null as null | string,
  disconnect: false,
};

// Async thunk for registering a user

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearRedirect: (state) => {
      state.redirectTo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : "An error occurred";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.redirectTo = "/chat-room";
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : "An error occurred";
    });
  },
});

export { registerUser, loginUser };

export default authSlice.reducer;
export const { clearRedirect } = authSlice.actions;