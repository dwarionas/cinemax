import React from 'react';
import { IGenre, ISliderData } from "../../types/types";
import { Star, Play, Plus, DetectGenres } from "../AuxiliaryComponents";

interface IProps {
    item: ISliderData;
}

const HomeMain: React.FC<IProps> = ({ item }) => {
    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <Star rate={item.vote_average} />
            <DetectGenres genresArray={item.genre_ids}/>
            <div className={'home__main-buttons'}>
                <Play/>
                <Plus/>
            </div>
            <span className={'home__main-description'}>{item.overview}</span>
        </div>
    );
};

export default HomeMain;