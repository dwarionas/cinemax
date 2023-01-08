import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import { IData } from "../../types";

interface IRequestProps {
    searchQuery: string;
    page: number;
}

interface IState {
    query: string;
    currentPage: number;
    searchLoading: boolean;
    searchData: IData[];
    searchTotalPages: number;
    searchTotalResults: number;
    recommendationData: IData[];
}

const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

export const searchRequest = createAsyncThunk('search/searchRequest', async (props: IRequestProps) => {
    const { searchQuery, page } = props;

    const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US`);

    return searchResponse.data;
});

export const recommendationRequest = createAsyncThunk('search/recommendationRequest', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);

    return response.data.results;
});

const initialState: IState = {
    query: '',
    currentPage: 1,
    searchLoading: false,
    searchData: [],
    searchTotalPages: 0,
    searchTotalResults: 0,
    recommendationData: [],
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
    extraReducers: builder => {
        builder
            .addCase(searchRequest.pending, state => {
                state.searchLoading = true;
                state.searchData = [];
            })
            .addCase(searchRequest.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchTotalPages = action.payload.total_pages;
                state.searchTotalResults = action.payload.total_results;
                state.searchData = action.payload.results;
            })
            .addCase(searchRequest.rejected, state => {
                state.searchLoading = false;
                state.searchData = [];
            })

            .addCase(recommendationRequest.fulfilled, (state, action) => {
                state.recommendationData = action.payload;
            })
    }
});

export const { setQuery, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;