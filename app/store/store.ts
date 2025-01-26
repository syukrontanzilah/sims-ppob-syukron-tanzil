import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./slices/servicesSlice"; 
import bannerReducer from "./slices/bannerSlice";

export const store = configureStore({
  reducer: {
    services: servicesReducer, 
    banner: bannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
