import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ContactResponse, FetchAddSubContactParams } from "../../types/contact";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  loading: false,
  error: null as string | null,
  addContactSuccess: false,
};

const contactOperationsSlice = createSlice({
  name: "contactOperations",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddSubContact.fulfilled, (state) => {
      state.addContactSuccess = true;
      state.loading = false;
    });
    builder.addCase(fetchAddSubContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddSubContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    });
  },
});

export const fetchAddSubContact = createAsyncThunk<
  ContactResponse,
  FetchAddSubContactParams
>("contactOperations/fetchAddSubContact", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put<ContactResponse>(
      `${VITE_API_URL}/contacts/addSubContact`,
      {
        phoneNumber: data.newSubContactNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export default contactOperationsSlice.reducer;
