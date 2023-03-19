import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
    query: string;
    currentPage: number;
}


const initialState: IState = {
    query: '',
    currentPage: 1,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
});

export const { setQuery, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;