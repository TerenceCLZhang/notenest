import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "./accessTokenSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
