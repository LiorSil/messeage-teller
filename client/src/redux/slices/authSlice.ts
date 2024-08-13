import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; //import API_BASE_URL from .env
const VITE_API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  userData: {
    email: "",
    password: "",
    phoneNumber: "",
  },
  loading: false,
  error: "",
  success: false,
};

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  "register/registerUser",
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

export const loginUser = createAsyncThunk(
  "register/loginUser",
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
        // Return the error message from the API response
        return rejectWithValue(err.response.data.message);
      } else {
        // Return a generic error message
        return rejectWithValue("An error occurred");
      }
    }
  }
);

const authSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : "An error occurred";
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.success = true;
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

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
