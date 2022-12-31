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
    vote_average: number;
    vote_count?: number;
    name?: string;
    origin_country?: string[];
    media_type? : 'movie' | 'tv';
    first_air_date?: string;
}

interface IState {
    activeCategory: number;
    activeItem: number;
    sliderDataStatus: string;
    sliderData: ISliderData[];
    popularDataStatus: string;
    popularMoviesData: ISliderData[];
    popularTVData: ISliderData[];
}

const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

export const homeRequest = createAsyncThunk('home/homeRequest', async (page: number) => {
    const data = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=${page}`);
    return data.data.results;
});

export const categoryRequest = createAsyncThunk('home/categoryRequest', async (page: number) => {
    const popularMovies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    const popularTV = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);

    return {
        popularMovies: popularMovies.data.results,
        popularTV: popularTV.data.results
    }
});

const initialState: IState = {
    activeCategory: 0,
    activeItem: 0,

    sliderDataStatus: '',
    sliderData: [],

    popularDataStatus: '',
    popularMoviesData: [],
    popularTVData: []
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
                state.sliderDataStatus = 'pending';
                state.sliderData = [];
                state.popularMoviesData = [];
                state.popularTVData = [];
            })
            .addCase(homeRequest.fulfilled, (state, action) => {
                state.sliderDataStatus = 'fulfilled';
                state.sliderData = action.payload;
                state.popularMoviesData = action.payload.popularMovies;
                state.popularTVData = action.payload.popularTV;
            })
            .addCase(homeRequest.rejected, state => {
                state.sliderDataStatus = 'rejected';
                state.sliderData = [];
                state.popularMoviesData = [];
                state.popularTVData = [];
            })

            .addCase(categoryRequest.pending, state => {
                state.popularDataStatus = 'pending';
                state.popularMoviesData = [];
                state.popularTVData = [];
            })
            .addCase(categoryRequest.fulfilled, (state, action) => {
                state.popularDataStatus = 'fulfilled';
                state.popularMoviesData = action.payload.popularMovies;
                state.popularTVData = action.payload.popularTV;
            })
            .addCase(categoryRequest.rejected, state => {
                state.popularDataStatus = 'rejected';
                state.popularMoviesData = [];
                state.popularTVData = [];
            })
    }
});

export const { setActiveCategory, setActiveItem } = homeSlice.actions;
export default homeSlice.reducer;