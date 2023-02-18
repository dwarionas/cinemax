import React from 'react';
import { Link } from 'react-router-dom';
import { IData } from "../../types";
import { Rating, PlayIcon, PlusIcon, DetectGenres } from "../Helpers";
import { createBookmark } from '../bookmarking/addBookmark';

import { useMutation } from '@apollo/client';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import addBookmark from '../../graphql/mutations/bookmarking/AddBookmark.graphql';
import { setBookmarks } from '../../redux/slices/authSlice';

const HomeMain: React.FC<{ item: IData }> = ({ item }) => {
    const type = item.first_air_date ? 'tv' : 'movie'
    const id = item.id;

    const dispatch = useAppDispatch();
    const userID = useSelector((state: RootState) => state.auth.user.id)

    const [bookmark] = useMutation(addBookmark);


    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <Rating rate={item.vote_average} />
            <DetectGenres genresArray={item.genre_ids} />
            <div className={'home__main-buttons'}>
                <Link to={`/${item.first_air_date ? 'tv' : 'movie'}/${item.id}`} className={'home__main-button'}>
                    <PlayIcon />
                </Link>
                <div onClick={() => createBookmark({ bookmark, setBookmarks, dispatch, id, type, userID })}>
                    <PlusIcon classText={'home__main-button'} />
                </div>
            </div>
            <span className={'home__main-description'}>{item.overview}</span>
        </div>
    );
};

export default HomeMain;