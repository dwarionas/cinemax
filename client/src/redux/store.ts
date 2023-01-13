import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { api } from "../api/api";
import home from "./slices/homeSlice";
import search from "./slices/searchSlice";

const store = configureStore({
    reducer: {
        home,
        search,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()