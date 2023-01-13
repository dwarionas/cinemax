import React from 'react';
import { IGenre, IData } from "../../types";
import { StarIcon, PlayIcon, PlusIcon, DetectGenres } from "../AuxiliaryComponents";

interface IProps {
    item: IData;
}

const HomeMain: React.FC<IProps> = ({ item }) => {
    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <StarIcon rate={item.vote_average} />
            <DetectGenres genresArray={item.genre_ids}/>
            <div className={'home__main-buttons'}>
                <PlayIcon/>
                <PlusIcon/>
            </div>
            <span className={'home__main-description'}>{item.overview}</span>
        </div>
    );
};

export default HomeMain;