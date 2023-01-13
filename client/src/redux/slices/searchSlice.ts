import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface IDetailsProps {
    type: string;
    id: number;
}

interface IState {
    query: string;
    currentPage: number;
    searchTotalPages: number;
    searchTotalResults: number;
    detailsParams: IDetailsProps;
}


const initialState: IState = {
    query: '',
    currentPage: 1,

    searchTotalPages: 0,
    searchTotalResults: 0,

    detailsParams: {
        type: '',
        id: 0
    }
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
        },
        setDetailsParams: (state, action: PayloadAction<IDetailsProps>) => {
            state.detailsParams = action.payload;
        }
    },
});

export const { setQuery, setCurrentPage, setDetailsParams } = searchSlice.actions;
export default searchSlice.reducer;