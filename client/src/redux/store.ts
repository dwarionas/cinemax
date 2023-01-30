import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import home from "./slices/homeSlice";
import search from "./slices/searchSlice";
import auth from "./slices/authSlice";

const store = configureStore({
    reducer: {
        home,
        search,
        auth
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()