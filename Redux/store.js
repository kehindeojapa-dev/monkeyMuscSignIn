import { configureStore } from "@reduxjs/toolkit";
import dataLayerReducer from "./userData";

export const store = configureStore({
  reducer: {
    user: dataLayerReducer,
  },
});
