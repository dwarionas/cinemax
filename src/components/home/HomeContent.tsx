import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { homeRequest, setActiveItem, ISliderData } from "../../redux/slices/homeSlice";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HomeSlider from "./HomeSlider";


const HomeContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sliderData, activeItem } = useSelector((state: RootState) => state.home);

    React.useEffect(() => {
        dispatch(homeRequest())
    }, []);

    return (
        <div className={'home__content'}>
            {sliderData && sliderData.filter((_, i) => i === activeItem).map((item) => (
                <div className={'home__main'} key={item.id}>
                    <span className={'home__main-header'}>{item.title || item.name}</span>
                    <span className={'home__main-season'}>Season 1</span>
                    <div className={'home__main-stars'}>stars</div>
                    <span className={'home__main-genre'}>Crime | Drama | Mystery</span>
                    <div className={'home__main-buttons'}>
                        <button className={'home__main-buttons-watch'}>{'>'}</button>
                        <button className={'home__main-buttons-plus'}>+</button>
                    </div>
                    <span className={'home__main-description'}>{item.overview}</span>
                </div>
            ))}

            <div className={'home__slider'}>
                <Swiper slidesPerView={8} className={'home__swiper'} >
                    {sliderData && sliderData.map((item, i) => (
                        <SwiperSlide
                            key={item.id}
                            onClick={() => dispatch(setActiveItem(i))}
                            className={i === activeItem ? 'home-active-block' : 'home-inactive-block'}
                            title={item.title || item.name}
                        >
                            <HomeSlider
                                img={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                title={item.title as string || item.name as string}
                                key={item.id}
                                imgClassName={i === activeItem ? 'home__slider-active-img' : 'home__slider-inactive-img'}
                                titleClassName={i === activeItem ? 'home__slider-title-active' : 'home__slider-title-inactive'}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeContent;