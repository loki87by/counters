import { configureStore } from "@reduxjs/toolkit";
import countersSlice from './countersReducer'

export const store = configureStore({
  reducer: {
    counters: countersSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
