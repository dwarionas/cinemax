import React from 'react'
import '../../styles/profile.scss'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, RootState } from "../../redux/store";

import SearchItem from '../search/SearchItem';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user);
    const isLogged = useSelector((state: RootState) => state.auth.isLogged);

    return (
        <div className='profile'>
            <div className="profile__bookmarks">
                <span className='profile__bookmarks-title'>Saved bookmarks</span>
                <div className="profile__bookmarks-content">
                    {user.bookmarks.map(item => (
                        <SearchItem item={item} key={item.id} />
                    ))}
                </div>
            </div>

            <div className="profile__divider" />

            <div className="profile__info">
                <span className='profile__bookmarks-title'>User info</span>
                <span className="profile__info-text">Email: <span>{user.email}</span></span>
                <span className="profile__info-text">Bookmarks count: <span>{user.bookmarks.length}</span></span>
                <span className="profile__info-text">Joined: <span>{user.joined}</span></span>
            </div>
        </div>
    )
}

export default Profile