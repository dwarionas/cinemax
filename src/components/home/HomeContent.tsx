import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { homeRequest, setActiveItem, categoryRequest, ISliderData } from "../../redux/slices/homeSlice";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HomeSlider from "./HomeSlider";
import HomeMain from "./HomeMain";


const HomeContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sliderData, activeItem, activeCategory, popularMoviesData, popularTVData } = useSelector((state: RootState) => state.home);

    const initialRequest = (page: number) => {
        if (activeCategory === 0) {
            dispatch(homeRequest(page));
        } else {
            dispatch(categoryRequest(page));
        }
    }

    React.useEffect(() => {
        initialRequest(1);
    }, [activeCategory]);

    const detectData = (): ISliderData[] => {
        if (popularMoviesData && popularTVData) {
            switch (activeCategory) {
                case 1:
                    return [...popularTVData, ...popularMoviesData]
                        .filter((el, i) => el.genre_ids.includes(35))
                        .sort((a, b) => b.vote_average - a.vote_average);
                case 2:
                    return [...popularTVData, ...popularMoviesData]
                        .filter((el, i) => el.genre_ids.includes(14))
                        .sort((a, b) => b.vote_average - a.vote_average);
                case 3:
                    return [...popularTVData, ...popularMoviesData]
                        .filter((el, i) => el.genre_ids.includes(18))
                        .sort((a, b) => b.vote_average - a.vote_average);
                case 4:
                    return [...popularTVData, ...popularMoviesData]
                        .filter((el, i) => el.genre_ids.includes(12))
                        .sort((a, b) => b.vote_average - a.vote_average);
                case 5:
                    return [...popularTVData, ...popularMoviesData]
                        .filter((el, i) => el.genre_ids.includes(27))
                        .sort((a, b) => b.vote_average - a.vote_average);
                default:
                    return sliderData;

            }
        } else {
            return sliderData;
        }
    }

    const data = detectData();

    return (
        <div className={'home__content'}>
            {data && data.filter((_, i) => i === activeItem).map((item) => (
                <HomeMain item={item} key={item.id} />
            ))}

            <div className={'home__slider'}>
                <Swiper slidesPerView={8} className={'home__swiper'} >
                    {data && data.map((item, i) => (
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