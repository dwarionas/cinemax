import axios from "axios";

const BASE = 'https://api.themoviedb.org/3'
const API_KEY = '3e9b52dbfb07553d4df2f99c97de61e7';

const root = {
    getSlider: async (props) => {
        const { page, genre } = props;
        const popularMovies =
            await axios.get(`${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);
        const popularTV =
            await axios.get(`${BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);
        return [...popularMovies.data.results, ...popularTV.data.results];
    },

    getGenres: async () => {
        const movieGenres = await axios.get(`${BASE}/genre/movie/list?api_key=${API_KEY}`);
        const tvGenres = await axios.get(`${BASE}/genre/tv/list?api_key=${API_KEY}`);
        return [...movieGenres.data.genres, ...tvGenres.data.genres]
            .filter((value, index, self) => self.findIndex(el => el.id === value.id) === index);
    },

    getRec: async () => {
        const response = await axios.get(`${BASE}/trending/all/week?api_key=${API_KEY}`);
        return response.data.results;
    },

    getSearch: async (props) => {
        const { searchQuery, page } = props;
        const searchResponse = await axios.get(`${BASE}/search/multi?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US`);
        return searchResponse.data;
    },

    getSliced: async (props) => {
        const { searchQuery, page } = props;
        const searchSliceResponse = await axios.get(`${BASE}/search/multi?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US`);
        return searchSliceResponse.data.results.slice(0, 4);
    },
    
    getDetails: async (props) => {
        const { type, id } = props;
        const response = await axios.get(`${BASE}/${type}/${id}?api_key=${API_KEY}`);
        return [response.data];
    },
};

export default root;