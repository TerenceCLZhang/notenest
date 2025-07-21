import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type themeSliceType = {
  theme: "light" | "dark";
};

const initialState: themeSliceType = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
