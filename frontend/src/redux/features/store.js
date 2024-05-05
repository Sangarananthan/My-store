import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
import favoriteReducer from "./favorites/favoriteSlice";
import { getFavoriteProductsFormLocalStorage } from "../../utils/localStorage";
const initialfavorites = getFavoriteProductsFormLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
  },
  preloadedState: {
    favorites: initialfavorites,
  },
  middleware: (getDefaultmiddleware) =>
    getDefaultmiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
