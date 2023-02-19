import React from 'react';
import { Link } from 'react-router-dom';
import { IData } from "../../types";
import { PlayIcon, PlusIcon } from '../Helpers';
import { createBookmark } from '../bookmarking/addBookmark';

import { useMutation } from '@apollo/client';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import addBookmark from '../../graphql/mutations/bookmarking/AddBookmark.graphql';
import { setBookmarks } from '../../redux/slices/authSlice';

interface IProps {
    item: IData;
}

const SearchItem: React.FC<IProps> = ({ item }) => {
    const [hover, setHover] = React.useState<boolean>(false);

    const type = item.first_air_date ? 'tv' : 'movie'
    const id = item.id;

    const dispatch = useAppDispatch();
    const userID = useSelector((state: RootState) => state.auth.user.id)

    const [bookmark] = useMutation(addBookmark);

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
                    <div onClick={() => createBookmark({ bookmark, setBookmarks, dispatch, id, type, userID })}>
                        <PlusIcon classText={'search__main-content-wrapper-item-container-btn'} />
                    </div>
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