export interface IData {
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

export interface IGenre {
    id: number;
    name: string;
}