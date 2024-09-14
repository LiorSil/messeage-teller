import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks/authThunks";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  token: "",
  loading: false,
  error: "",
  disconnect: false,
};

// Async thunk for registering a user

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      const { token } = action.payload;
      cookies.set("token", token, { path: "/" });
      state.loading = false;
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
