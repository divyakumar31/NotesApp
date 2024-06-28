import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/note/noteSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});
