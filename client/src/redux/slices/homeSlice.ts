import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

import { IData, IGenre } from "../../types";

interface IState {
    activeCategory: number;
    activeItem: number;
    genresList: IGenre[];
}

const initialState: IState = {
    activeCategory: 0,
    activeItem: 0,
    genresList: []
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload;
        },
        setActiveItem(state, action: PayloadAction<number>) {
            state.activeItem = action.payload;
        },
        setGenresList(state, action: PayloadAction<IGenre[]>) {
            state.genresList = action.payload;
        }
    }
});

export const { setActiveCategory, setActiveItem, setGenresList } = homeSlice.actions;
export default homeSlice.reducer;