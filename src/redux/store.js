import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./pasteSlice.js";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
