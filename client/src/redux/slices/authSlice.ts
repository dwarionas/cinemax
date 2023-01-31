import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "../../types";

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
        setIsLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload;
        },
        setAuthModalActive: (state, action: PayloadAction<boolean>) => {
            state.isAuthModalActive = action.payload;
        }
    },
});

export const { setUser, setIsLogged, setAuthModalActive } = authSlice.actions;
export default authSlice.reducer;