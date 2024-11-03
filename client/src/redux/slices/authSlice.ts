import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks/authThunks";
import Cookies from "universal-cookie";
import { initialState } from "../states/authState.ts";

const cookies = new Cookies();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, _) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { token } = action.payload;
      cookies.set("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600),
      });
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export { registerUser, loginUser };
export const { initialError } = authSlice.actions;

export default authSlice.reducer;
