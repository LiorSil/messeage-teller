// src/utils/handleAxiosError.ts
import axios from "axios";

export const handleAxiosError = <T>(
  error: unknown,
  rejectWithValue: (value: T) => T
): T => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data as T);
    }
    return rejectWithValue("An unexpected error occurred" as T);
  }
  // Handle non-Axios errors, if needed
  return rejectWithValue("An unexpected error occurred" as T);
};
