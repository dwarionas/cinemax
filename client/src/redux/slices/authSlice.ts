import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser, IBookmark } from "../../types";

interface IState {
    user: IUser;
    isLogged: boolean;
    isAuthModalActive: boolean;
}

const initialState: IState = {
    user: {
        email: '',
        id: '',
        role: '',
        bookmarks: [],
        joined: ''
    },
    isLogged: false,
    isAuthModalActive: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setBookmarks: (state, action: PayloadAction<IBookmark>) => {
            state.user.bookmarks.push(action.payload);
        },
        removeBookmarks: (state, action: PayloadAction<string>) => {
            let index = state.user.bookmarks.findIndex(obj => obj.bookmarkID === action.payload);
            if (index !== -1) {
                state.user.bookmarks.splice(index, 1);
            }
        },
        setIsLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload;
        },
        setAuthModalActive: (state, action: PayloadAction<boolean>) => {
            state.isAuthModalActive = action.payload;
        }
    },
});

export const { setUser, setBookmarks, removeBookmarks, setIsLogged, setAuthModalActive } = authSlice.actions;
export default authSlice.reducer;