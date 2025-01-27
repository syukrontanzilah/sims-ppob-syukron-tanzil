import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./slices/servicesSlice"; 
import bannerReducer from "./slices/bannerSlice";
import profileReducer from "./slices/profileSlice";
import balanceReducer from "./slices/balanceSlice";
import historyReducer from "./slices/historySlice";

export const store = configureStore({
  reducer: {
    services: servicesReducer, 
    banner: bannerReducer,
    profile: profileReducer,
    balance: balanceReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
