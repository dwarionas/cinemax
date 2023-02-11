import React from 'react';
import { Link } from 'react-router-dom';
import { IData } from "../../types";
import { Rating, PlayIcon, PlusIcon, DetectGenres } from "../Helpers";

interface IProps {
    item: IData;
}

const HomeMain: React.FC<IProps> = ({ item }) => {
    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <Rating rate={item.vote_average} />
            <DetectGenres genresArray={item.genre_ids} />
            <div className={'home__main-buttons'}>
                <Link to={`/${item.first_air_date ? 'tv' : 'movie'}/${item.id}`} className={'home__main-button'}>
                    <PlayIcon />
                </Link>
                <PlusIcon classText={'home__main-button'} />
            </div>
            <span className={'home__main-description'}>{item.overview}</span>
        </div>
    );
};

export default HomeMain;