import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "./accessTokenSlice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
