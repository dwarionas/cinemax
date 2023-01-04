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
    sliderDataLoading: boolean;
    sliderData: ISliderData[];
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

const initialState: IState = {
    activeCategory: 0,
    activeItem: 0,
    sliderDataLoading: false,
    sliderData: []
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
            .addCase(homeRequest.fulfilled, (state, action: PayloadAction<ISliderData[]>) => {
                state.sliderDataLoading = false;
                state.sliderData = action.payload;
            })
            .addCase(homeRequest.rejected, state => {
                state.sliderDataLoading = false;
                state.sliderData = [];
            })
    }
});

export const { setActiveCategory, setActiveItem } = homeSlice.actions;
export default homeSlice.reducer;