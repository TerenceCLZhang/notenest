import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type userSliceType = {
  username: string;
};

const initialState: userSliceType = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = "";
    },
  },
});

export const { setUsername, clearUsername } = userSlice.actions;

export default userSlice.reducer;
