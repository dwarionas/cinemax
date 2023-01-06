import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { homeRequest, setActiveItem, genresRequest } from "../../redux/slices/homeSlice";
import { preventAnim } from "../AuxiliaryComponents";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HomeSlider from "./HomeSlider";
import HomeMain from "./HomeMain";

const HomeContent: React.FC = () => {
    const genres: number[] = [35, 14, 18, 12, 27];

    const dispatch = useAppDispatch();
    const { sliderData, activeItem, activeCategory, sliderDataLoading } = useSelector((state: RootState) => state.home);

    React.useEffect(() => {
        dispatch(genresRequest())
        preventAnim();
    }, []);

    React.useEffect(() => {
        if (activeCategory === 0) {
            dispatch(homeRequest({
                page: 1,
                genre: ''
            }));
        } else {
            const currentGenre = genres.filter((el, i) => i === activeCategory - 1).join('');
            dispatch(homeRequest({
                page: 1,
                genre: currentGenre
            }));
        }
    }, [activeCategory]);

    return (
        <div className={'home__content'}>
            {sliderData && sliderData.filter((_, i) => i === activeItem).map((item) => (
                <HomeMain item={item} key={item.id}/>
            ))}

            <div className={'home__slider'}>
                <Swiper slidesPerView={8} className={'home__swiper'} >
                    {sliderData && sliderData.map((item, i) => (
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