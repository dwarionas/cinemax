import React from 'react';
import { ISliderData } from "../../redux/slices/homeSlice";
import { Star } from "../Icons";

interface IProps {
    item: ISliderData;
}

const HomeMain: React.FC<IProps> = ({ item }) => {
    const yellow = '#F9B601';
    const grey = '#9b9b9b';

    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <span className={'home__main-season'}>Season 1</span>
            <div className={'home__main-stars'}>
                {
                    [...Array(Math.round(item.vote_average / 2))].map(x => ++x).map(() => (
                        <Star color={yellow} />
                    ))
                }
                {
                    [...Array(5 - Math.round(item.vote_average / 2))].map(x => ++x).map(() => (
                        <Star color={grey} />
                    ))
                }
            </div>
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