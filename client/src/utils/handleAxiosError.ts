// src/utils/handleAxiosError.ts
import axios from "axios";

export const handleAxiosError = <T>(
  error: any,
  rejectWithValue: (value: T) => T
): T => {
  // @ts-ignore
  if (axios.isAxiosError(error) && error.response) {
    return rejectWithValue(error.response.data as T);
  }
  console.log("error", error);
  if (error?.code === "ERR_NETWORK") {
    return rejectWithValue("🚀Network error, Server is unreachable " as T);
  }
  return rejectWithValue(`${error?.message || "unknown error"}` as T);
};
