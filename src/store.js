import { configureStore } from "@reduxjs/toolkit";
import weatherslice from "./weather";

export const store = configureStore({
  reducer: {
    weather: weatherslice,
  },
});
