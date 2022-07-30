import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Counter } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

const initialState = [] as unknown as [Counter];

const countersSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    addCounter: (
      state,
      action: PayloadAction<{
        counter: Counter;
      }>
    ) => {
      if (!state.find((counter) => counter.id === action.payload.counter.id)) {
        const counter = action.payload.counter;
        const id = uuidv4();
        counter.id = id;
        counter.timer = action.payload.counter.timer;
        counter.title = action.payload.counter.title || undefined;
        counter.caption = action.payload.counter.caption || undefined;
        state.push(counter);
      }
    },
    editCounter: (
      state,
      action: PayloadAction<{
        body: number;
        id: string;
      }>
    ) => {
      const current = state.findIndex(
        (counter) => counter.id === action.payload.id
      );
      const { body } = action.payload;
      state[current].body = body;
    },
    editCounterTitle: (
      state,
      action: PayloadAction<{
        title: string | undefined;
        id: string;
      }>
    ) => {
      const current = state.findIndex(
        (counter) => counter.id === action.payload.id
      );
      const { title } = action.payload;
      state[current].title = title;
    },
    editCounterCaption: (
      state,
      action: PayloadAction<{
        caption: string | undefined;
        id: string;
      }>
    ) => {
      const current = state.findIndex(
        (counter) => counter.id === action.payload.id
      );
      const { caption } = action.payload;
      state[current].caption = caption;
    },
  },
});

export const { addCounter, editCounter, editCounterTitle, editCounterCaption } =
  countersSlice.actions;
export default countersSlice.reducer;
