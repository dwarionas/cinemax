export interface IGlobal {
    page: number;
    results: IData[];
    total_pages: number;
    total_results: number;
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IData {
    adult?: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name?: string;
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
    origin_country: string[];
    media_type: 'movie' | 'tv';
    first_air_date: string;
}

export interface IDetalizedData extends IData {
    belongs_to_collection?: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    created_by?: {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string;
    }[];
    episode_run_time?: number[];
    budget?: number;
    genres: IGenre[];
    homepage: string;
    imdb_id?: string;
    in_production?: boolean;
    production_companies: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[] | [];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[] | [];
    revenue?: number;
    runtime?: number;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        runtime: null,
        season_number: number;
        show_id: number;
        still_path: string | null,
        vote_average: number;
        vote_count: number;
    },
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    next_episode_to_air?: null;
    status: string;
    tagline: string;
    networks?: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    seasons?: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null,
        season_number: number;
    }[];
    type?: string;
}

export interface IBookmark {
    title: string;
    name: string;
    poster_path: string;
    first_air_date?: string;
    release_date?: string
    id: number;
    bookmarkID?: string;
}

export interface IUser {
    email: string;
    id: string;
    role: string;
    bookmarks: IBookmark[];
    joined: string;
}