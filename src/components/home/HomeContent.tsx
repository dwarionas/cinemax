import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { homeRequest, setActiveItem, ISliderData } from "../../redux/slices/homeSlice";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HomeSlider from "./HomeSlider";
import HomeMain from "./HomeMain";

const HomeContent: React.FC = () => {
    let sortedArr: ISliderData[];
    const genres: number[] = [35, 14, 18, 12, 27];

    const dispatch = useAppDispatch();
    const { sliderData, activeItem, activeCategory } = useSelector((state: RootState) => state.home);

    React.useEffect(() => {
        dispatch(homeRequest(1));
    }, []);

    const detectData = (): ISliderData[] => {
        if (sliderData) {
            genres.forEach((item, i) => {
                if (activeCategory !== 0 && i === activeCategory - 1) {
                    sortedArr = sliderData
                        .filter(el => el.genre_ids.includes(item))
                        .sort((a, b) => b.vote_average - a.vote_average);
                }
            });
        }

        return sortedArr;
    }

    let data = activeCategory === 0 ? sliderData : detectData();

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