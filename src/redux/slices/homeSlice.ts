import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

export interface ISliderData {
    adult?: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string | null;
    release_date?: string;
    title: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    name?: string;
    origin_country?: string[];
}

interface IState {
    activeCategory: number;
    status: string;
    sliderData: ISliderData[];
    activeItem: number;
}

const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

export const homeRequest = createAsyncThunk('home/homeRequest', async () => {
    const data = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);
    return data.data.results;
});

const initialState: IState = {
    activeCategory: 0,
    status: '',
    sliderData: [],
    activeItem: 0
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
        }
    },
    extraReducers: builder => {
        builder
            .addCase(homeRequest.pending, state => {
                state.status = 'pending';
                state.sliderData = [];
            })
            .addCase(homeRequest.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.sliderData = action.payload;
            })
            .addCase(homeRequest.rejected, state => {
                state.status = 'rejected';
                state.sliderData = [];
            })
    }
});

export const { setActiveCategory, setActiveItem } = homeSlice.actions;
export default homeSlice.reducer;