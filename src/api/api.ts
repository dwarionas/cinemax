import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { IGlobal, IData, IDetalizedData, IGenre } from "../types";

interface ISearchRequestProps {
    searchQuery: string;
    page: number;
}

interface IDetailsProps {
    type: string;
    id: number;
}

interface IHomeRequestProps {
    page: number;
    genre: string;
}

const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: builder => ({
        getSliderData: builder.query<any, IHomeRequestProps>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const { page, genre } = _arg;

                const popularMovies = await fetchWithBQ(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);
                const popularTV = await fetchWithBQ(`/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);

                return { data: [popularMovies.data, popularTV.data] };
            },
        }),
        getGenres: builder.query<any, void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const movieGenres = await fetchWithBQ(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
                const tvGenres = await fetchWithBQ(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`);

                return { data: [movieGenres.data, tvGenres.data] };
            },
        }),

        getRecommendation: builder.query<IGlobal, void>({
            query: () => `/trending/all/week?api_key=${API_KEY}`
        }),
        getSearchData: builder.query<IGlobal, ISearchRequestProps>({
            query: (props) => `/search/multi?api_key=${API_KEY}&query=${props.searchQuery}&page=${props.page}&language=en-US`
        }),
        getSlicedSearchData: builder.query<IGlobal, ISearchRequestProps>({
            query: (props) => `/search/multi?api_key=${API_KEY}&query=${props.searchQuery}&page=${props.page}&language=en-US`
        }),
        getDetails: builder.query<IDetalizedData, IDetailsProps>({
            query: (props) => `${props.type}/${props.id}?api_key=${API_KEY}`,
        })
    })
});