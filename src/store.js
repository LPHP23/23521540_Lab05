import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

/**
 * Redux store configuration with Redux Toolkit
 * Includes middleware for development and production optimizations
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ["cart/applyDiscount/pending"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
