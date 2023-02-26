import React from 'react';
import { Link } from 'react-router-dom';
import { IBookmark, IData } from "../../types";
import { PlayIcon, PlusIcon, RemoveIcon } from '../Helpers';
import { createBookmark } from '../bookmarking/addBookmark';
import { deleteBookmark } from '../bookmarking/removeBookmark';

import { useMutation } from '@apollo/client';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import addBookmark from '../../graphql/mutations/bookmarking/AddBookmark.graphql';
import removeBookmark from '../../graphql/mutations/bookmarking/RemoveBookmark.graphql';
import { setBookmarks, removeBookmarks } from '../../redux/slices/authSlice';

interface IProps {
    item: IData | IBookmark;
}

const SearchItem: React.FC<IProps> = ({ item }) => {
    const [hover, setHover] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const userID = useSelector((state: RootState) => state.auth.user.id)
    const bookmarks = useSelector((state: RootState) => state.auth.user.bookmarks)
    const bookmarkID = bookmarks.filter(el => el.id === item.id)[0]?.bookmarkID;

    const [throwBookmark] = useMutation(removeBookmark);
    const [bookmark] = useMutation(addBookmark);

    const createBookmarkData = {
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
        <div
            className={'search__main-content-wrapper-item'}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title={item.title || item.name}
        >
            <div className='search__main-content-wrapper-item-container'>
                {item.poster_path ?
                    <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} className={'search__main-content-wrapper-item-container-image'} />
                    :
                    <div className='search__main-content-wrapper-item-container-noimage' >Image not found</div>
                }
                <div className='search__main-content-wrapper-item-container-btns' style={hover ? { display: 'flex' } : { display: 'none' }}>
                    <Link
                        to={`/${item.first_air_date ? 'tv' : 'movie'}/${item.id}`}
                        className={'search__main-content-wrapper-item-container-btn'}>
                        <PlayIcon />
                    </Link>
                    {bookmarks.find(({ id }) => id === item.id)
                        ?
                        <div
                            className={'search__main-content-wrapper-item-container-btn'}
                            onClick={() => deleteBookmark(removeBookmarkData)}
                        >
                            <RemoveIcon />

                        </div>
                        :
                        <div
                            className={'search__main-content-wrapper-item-container-btn'}
                            onClick={() => createBookmark(createBookmarkData)}
                        >
                            <PlusIcon />

                        </div>
                    }
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <span className='search__main-content-wrapper-item-text' style={{ fontSize: '15px' }}>{item.title || item.name}</span>
                <span style={{ color: 'grey' }}>{item.first_air_date?.slice(0, 4) || item.release_date?.slice(0, 4)}</span>
            </div>
        </div>
    );
};

export default SearchItem;