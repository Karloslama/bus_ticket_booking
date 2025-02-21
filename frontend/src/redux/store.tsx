import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import busReducer from "./busSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bus: busReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
