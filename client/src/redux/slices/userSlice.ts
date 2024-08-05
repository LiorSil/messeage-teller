import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Import RootState from the appropriate location

export interface UserState {
  value: string;
}

const initialState: UserState = {
  value: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
