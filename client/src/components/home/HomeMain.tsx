import React from 'react';
import { Link } from 'react-router-dom';
import { IData } from "../../types";
import { Rating, PlayIcon, PlusIcon, RemoveIcon, DetectGenres } from "../Helpers";
import { createBookmark } from '../bookmarking/addBookmark';
import { deleteBookmark } from '../bookmarking/removeBookmark';

import { useMutation } from '@apollo/client';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import addBookmark from '../../graphql/mutations/bookmarking/AddBookmark.graphql';
import removeBookmark from '../../graphql/mutations/bookmarking/RemoveBookmark.graphql';
import { setBookmarks, removeBookmarks } from '../../redux/slices/authSlice';

const HomeMain: React.FC<{ item: IData }> = ({ item }) => {
    const dispatch = useAppDispatch();
    const userID = useSelector((state: RootState) => state.auth.user.id)
    const bookmarks = useSelector((state: RootState) => state.auth.user.bookmarks)
    const bookmarkID = bookmarks.filter(el => el.id === item.id)[0]?.bookmarkID;

    const [throwBookmark] = useMutation(removeBookmark);
    const [bookmark] = useMutation(addBookmark);

    const bookmarkData = {
        bookmark,
        setBookmarks,
        dispatch,
        id: item.id,
        name: item.name as string,
        poster_path: item.poster_path as string,
        title: item.title,
        first_air_date: item.first_air_date,
        release_date: item.release_date,
        userID
    }

    const removeBookmarkData = {
        bookmarkID: bookmarkID as string,
        userID,
        removeBookmarks,
        throwBookmark,
        dispatch
    }

    return (
        <div className={'home__main'} >
            <span className={'home__main-header'}>{item.title || item.name}</span>
            <Rating rate={item.vote_average} />
            <DetectGenres genresArray={item.genre_ids} />
            <div className={'home__main-buttons'}>
                <Link to={`/${item.first_air_date ? 'tv' : 'movie'}/${item.id}`} className={'home__main-button'}>
                    <PlayIcon />
                </Link>
                {bookmarks.find(({ id }) => id === item.id)
                    ?
                    <div
                        className={'home__main-button'}
                        onClick={() => deleteBookmark(removeBookmarkData)}
                    >
                        <RemoveIcon />

                    </div>
                    :
                    <div
                        className={'home__main-button'}
                        onClick={() => createBookmark(bookmarkData)}
                    >
                        <PlusIcon />

                    </div>
                }
            </div>
            <span className={'home__main-description'}>{item.overview}</span>
        </div>
    );
};

export default HomeMain;