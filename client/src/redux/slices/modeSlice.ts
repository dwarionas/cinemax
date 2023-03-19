import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
    darkMode: boolean;
}

const initialState: IState = {
    darkMode: false
}

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setDarkTheme: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        }
    },
});

export const { setDarkTheme } = modeSlice.actions;
export default modeSlice.reducer;