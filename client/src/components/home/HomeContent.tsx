import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { setGenresList, setActiveItem } from "../../redux/slices/homeSlice";
import { preventAnim } from "../Helpers";

import { useQuery } from "@apollo/client";
import getSlider from '../../queries/home/slider.graphql';
import getGenres from '../../queries/home/genres.graphql';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import HomeSlider from "./HomeSlider";
import HomeMain from "./HomeMain";

import { IData } from "../../types";

const HomeContent: React.FC = () => {
    const genresList: number[] = [35, 14, 18, 12, 27];

    const dispatch = useAppDispatch();
    const { activeItem, activeCategory } = useSelector((state: RootState) => state.home);

    const slider = useQuery(getSlider);
    const genres = useQuery(getGenres);

    React.useEffect(() => {
        dispatch(setGenresList(genres.data?.getGenres));
        preventAnim();
    }, []);

    React.useEffect(() => {
        if (activeCategory === 0) {
            slider.refetch({
                page: 1,
                genre: ''
            });
        } else {
            const currentGenre = genresList.filter((el, i) => i === activeCategory - 1).join('');
            slider.refetch({
                page: 1,
                genre: currentGenre
            });
        }
    }, [activeCategory]);

    return (
        <div className={'home__content'}>
            {slider.data?.getSlider.filter((_: IData, i: number) => i === activeItem).map((item: IData) => (
                <HomeMain item={item} key={item.id}/>
            ))}

            <div className={'home__slider'}>
                <Swiper slidesPerView={8} className={'home__swiper'} >
                    {slider.data?.getSlider.map((item: IData, i: number) => (
                        <SwiperSlide
                            key={item.id}
                            onClick={() => dispatch(setActiveItem(i))}
                            className={i === activeItem ? 'home-active-block' : ''}
                            title={item.title || item.name}
                        >
                            <HomeSlider
                                img={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                title={item.title as string || item.name as string}
                                key={item.id}
                                imgClassName={i === activeItem ? 'home__slider-active-img' : 'home__slider-inactive-img'}
                                titleClassName={i === activeItem ? 'home__slider-title-active' : 'home__slider-title-inactive '}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeContent;