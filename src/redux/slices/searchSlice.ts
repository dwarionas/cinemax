import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import { IData, IDetalizedData } from "../../types";

interface IRequestProps {
    searchQuery: string;
    page: number;
}

interface IDetailsProps {
    type: string;
    id: number;
}

interface IState {
    query: string;
    currentPage: number;
    searchLoading: boolean;
    searchData: IData[];
    slicedLoading: boolean;
    slicedSearchData: IData[];
    searchTotalPages: number;
    searchTotalResults: number;
    recommendationLoading: boolean;
    recommendationData: IData[];
    detalizedLoading: boolean;
    detalizedData: IDetalizedData[];
}

const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

export const searchRequest = createAsyncThunk('search/searchRequest', async (props: IRequestProps) => {
    const { searchQuery, page } = props;

    const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US`);

    return searchResponse.data
});

export const searchSliceRequest = createAsyncThunk('search/searchSliceRequest', async (props: IRequestProps) => {
    const { searchQuery, page } = props;

    const searchSliceResponse = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US`);

    return searchSliceResponse.data.results.slice(0, 4)
});

export const recommendationRequest = createAsyncThunk('search/recommendationRequest', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);

    return response.data.results;
});

export const detailsRequest = createAsyncThunk('search/detailsRequest', async (props: IDetailsProps) => {
    const { type, id } = props;

    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`);

    return [response.data];
});

const initialState: IState = {
    query: '',
    currentPage: 1,

    searchLoading: false,
    searchData: [],

    slicedLoading: false,
    slicedSearchData: [],

    searchTotalPages: 0,
    searchTotalResults: 0,

    recommendationLoading: false,
    recommendationData: [],

    detalizedLoading: false,
    detalizedData: []
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

            .addCase(recommendationRequest.pending, state => {
                state.recommendationLoading = true;
                state.recommendationData = [];
            })
            .addCase(recommendationRequest.fulfilled, (state, action) => {
                state.recommendationLoading = false;
                state.recommendationData = action.payload;
            })
            .addCase(recommendationRequest.rejected, state => {
                state.recommendationLoading = false;
                state.recommendationData = [];
            })

            .addCase(searchSliceRequest.pending, state => {
                state.slicedLoading = true;
                state.slicedSearchData = [];
            })
            .addCase(searchSliceRequest.fulfilled, (state, action) => {
                state.slicedLoading = false;
                state.slicedSearchData = action.payload;
            })
            .addCase(searchSliceRequest.rejected, state => {
                state.slicedLoading = false;
                state.slicedSearchData = [];
            })

            .addCase(detailsRequest.pending, state => {
                state.detalizedLoading = true;
                state.detalizedData = [];
            })
            .addCase(detailsRequest.fulfilled, (state, action) => {
                state.detalizedLoading = false;
                state.detalizedData = action.payload;
            })
            .addCase(detailsRequest.rejected, state => {
                state.detalizedLoading = false;
                state.detalizedData = [];
            })
    }
});

export const { setQuery, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;