import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBookmark } from "../../types";

interface IState {
    recent: IBookmark[];
}

const initialState: IState = {
    recent: []
}

const recentSlice = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        addObj: (state, action: PayloadAction<IBookmark>) => {
            let index = state.recent.findIndex(obj => obj === action.payload);
            if (index == -1) {
                state.recent.push(action.payload);
            }
        }
    },
});

export const { addObj } = recentSlice.actions;
export default recentSlice.reducer;