import React from 'react';
import { IGenre, IData } from "../../types";
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
                <PlayIcon classText={'home__main-button'} id={item.id} />
                <PlusIcon classText={'home__main-button'} />
            </div>
            <span className={'home__main-description'}>{item.overview}</span>
        </div>
    );
};

export default HomeMain;