import React from 'react';
import { ISliderData } from "../../redux/slices/homeSlice";
import { Star } from "../Icons";

interface IProps {
    item: ISliderData;
}

const HomeMain: React.FC<IProps> = ({ item }) => {
    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <span className={'home__main-season'}>Season 1</span>
            <Star rate={item.vote_average} />
            <span className={'home__main-genre'}>Crime | Drama | Mystery</span>
            <div className={'home__main-buttons'}>
                <button className={'home__main-buttons-watch'}>{'>'}</button>
                <button className={'home__main-buttons-plus'}>+</button>
            </div>
            <span className={'home__main-description'}>{item.overview}</span>
        </div>
    );
};

export default HomeMain;