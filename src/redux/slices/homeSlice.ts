import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

import { IData, IGenre } from "../../types";

interface IState {
    activeCategory: number;
    activeItem: number;
    sliderDataLoading: boolean;
    sliderData: IData[];
    genresList: IGenre[];
}

interface IRequestProps {
    page: number;
    genre: string;
}

const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

export const homeRequest = createAsyncThunk('home/homeRequest', async (props: IRequestProps) => {
    const { page, genre } = props;

    const popularMovies =
        await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);
    const popularTV =
        await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);

    return [...popularMovies.data.results, ...popularTV.data.results];
});

export const genresRequest = createAsyncThunk('home/genreRequest', async () => {
    const movieGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const tvGenres = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`);

    return [...movieGenres.data.genres, ...tvGenres.data.genres]
        .filter((value, index, self) => self.findIndex(el => el.id === value.id) === index);
});

const initialState: IState = {
    activeCategory: 0,
    activeItem: 0,
    sliderDataLoading: false,
    sliderData: [],
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
        }
    },
    extraReducers: builder => {
        builder
            .addCase(homeRequest.pending, state => {
                state.sliderDataLoading = true;
                state.sliderData = [];
            })
            .addCase(homeRequest.fulfilled, (state, action) => {
                state.sliderDataLoading = false;
                state.sliderData = action.payload;
            })
            .addCase(homeRequest.rejected, state => {
                state.sliderDataLoading = false;
                state.sliderData = [];
            })

            .addCase(genresRequest.fulfilled, (state, action) => {
                state.genresList = action.payload;
            })
    }
});

export const { setActiveCategory, setActiveItem } = homeSlice.actions;
export default homeSlice.reducer;