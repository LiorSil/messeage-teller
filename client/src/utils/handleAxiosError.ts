// src/utils/handleAxiosError.ts
import axios from "axios";

export const handleAxiosError = <T>(
  error: unknown,
  rejectWithValue: (value: T) => T,
): T => {
  // @ts-ignore
  if (axios.isAxiosError(error) && error.response) {
    return rejectWithValue(error.response.data as T);
  }
  return rejectWithValue("An unexpected error occurred" as T);
};
