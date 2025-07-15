import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type accessTokenSliceType = {
  token: string | null;
};

const initialState: accessTokenSliceType = {
  token: null,
};

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearAccessToken: (state) => {
      state.token = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
