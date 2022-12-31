import React from 'react';
import { ISliderData } from "../../redux/slices/homeSlice";

interface IProps {
    item: ISliderData;
}

const HomeMain: React.FC<IProps> = ({ item }) => {
    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <span className={'home__main-season'}>Season 1</span>
            <span className={'home__main-stars'}>Rate: {item.vote_average.toFixed(1)} ({item.vote_count} voices)</span>
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