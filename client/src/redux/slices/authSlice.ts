import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  token: "",
  loading: false,
  error: "",
  redirectTo: null as null | string,
  disconnect: false,
};

// Async thunk for registering a user
const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: {
      email: string;
      password: string;
      phoneNumber: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/auth/register`,
        userData
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        // Return the error message from the API response
        return rejectWithValue(err.response.data.message);
      } else {
        // Return a generic error message
        return rejectWithValue("An error occurred");
      }
    }
  }
);

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${VITE_API_URL}/auth/login`, userData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message);
      } else {
        // Return a generic error message
        return rejectWithValue("An error occurred");
      }
    }
  }
);

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