import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export default userSlice.reducer;
