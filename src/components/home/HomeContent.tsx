import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { setGenresList, setActiveItem } from "../../redux/slices/homeSlice";
import { preventAnim } from "../AuxiliaryComponents";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HomeSlider from "./HomeSlider";
import HomeMain from "./HomeMain";

import { api } from "../../api/api";
import { IGlobal, IData, IGenre } from "../../types";

interface IGenresGlobal extends IGlobal {
    genres: IGenre[];
}

const HomeContent: React.FC = () => {
    const genres: number[] = [35, 14, 18, 12, 27];

    const dispatch = useAppDispatch();
    const {  activeItem, activeCategory, } = useSelector((state: RootState) => state.home);

    const [ fetchSliderData, { data: sliderList } ] = api.useLazyGetSliderDataQuery();
    const sliderData: IData[] = sliderList ? sliderList.map((el: IGlobal, i: number) => [...el.results]).flat() : [];

    const [ fetchGenres, { data: genresList } ] = api.useLazyGetGenresQuery();
    const genresItems: IGenre[] = genresList ? genresList.map((el: IGenresGlobal, i: number) => [...el.genres]).flat() : [];
    const genresData: IGenre[] = genresItems.
        filter((value: IGenre, index: number, self: IGenre[]) => self.findIndex((el: any) => el.id === value.id) === index);


    React.useEffect(() => {
        fetchGenres();
        dispatch(setGenresList(genresData));
        preventAnim();
    }, []);

    React.useEffect(() => {
        if (activeCategory === 0) {
            fetchSliderData({
                page: 1,
                genre: ''
            });
        } else {
            const currentGenre = genres.filter((el, i) => i === activeCategory - 1).join('');
            fetchSliderData({
                page: 1,
                genre: currentGenre
            });
        }
    }, [activeCategory]);

    return (
        <div className={'home__content'}>
            {sliderData.filter((_, i) => i === activeItem).map((item) => (
                <HomeMain item={item} key={item.id}/>
            ))}

            <div className={'home__slider'}>
                <Swiper slidesPerView={8} className={'home__swiper'} >
                    {sliderData.map((item, i) => (
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