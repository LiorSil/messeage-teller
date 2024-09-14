import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

/**
 * Async thunk for registering a user
 * @param userData - The user data to register
 * @returns The response data from the API
 * @throws The error message from the API response or a generic error message
 */

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
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        // Return the error message from the API response
        return rejectWithValue(err.response.data.message);
      } else {
        // Return a generic error message
        return rejectWithValue("An error occurred");
      }
    }
  }
);

/**
 * Async thunk for logging in a user
 * @param userData - The user data to login
 * @returns The response data from the API
 * @throws The error message from the API response or a generic error message
 */

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
      console.log("response", response);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data) {
        return rejectWithValue(err.response.data.message);
      } else {
        // Return a generic error message
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export { registerUser, loginUser };
