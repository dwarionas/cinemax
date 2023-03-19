import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import { HomeIcon, ProfileIcon, RecentIcon, SearchIcon, SettingsIcon, LoginIcon, LogoutIcon } from "./Helpers";
import { setAuthModalActive, setIsLogged, setUser } from "../redux/slices/authSlice";
import ToggleMode from './ToggleMode';

const NavAside: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLogged = useSelector((state: RootState) => state.auth.isLogged);

    const logout = () => {
        if (window.localStorage.getItem('isLogged') && window.localStorage.getItem('token')) {
            window.localStorage.removeItem('isLogged');
            window.localStorage.removeItem('token');
            dispatch(setIsLogged(false));
            dispatch(setUser({
                email: '',
                id: '',
                role: '',
                bookmarks: [],
                joined: ''
            }))

            if (window.location.pathname == '/profile') {
                navigate('/');
            }
        } else {
            console.log('not auth')
        }
    }

    return (
        <nav className={'app__nav'}>
            <div className={'app__nav__wrapper'}>
                <NavLink
                    to={'/'}
                    className={'app__nav__wrapper__item'}
                    children={({ isActive }) => <HomeIcon color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/search'}
                    className={'app__nav__wrapper__item'}
                    children={({ isActive }) => <SearchIcon color={isActive ? '#fff' : '#56585C'} />}
                />

                {isLogged ?
                    <NavLink
                        to={'/profile'}
                        className={'app__nav__wrapper__item'}
                        children={({ isActive }) => <ProfileIcon color={isActive ? '#fff' : '#56585C'} />}
                    />
                    :
                    <div
                        className={'app__nav__wrapper__item'}
                        onClick={() => dispatch(setAuthModalActive(true))}
                    >
                        <ProfileIcon color={'#56585C'} />
                    </div>
                }

                {isLogged ?
                    <NavLink
                        to={'/recent'}
                        className={'app__nav__wrapper__item'}
                        children={({ isActive }) => <RecentIcon color={isActive ? '#fff' : '#56585C'} />}
                    />
                    :
                    <div
                        className={'app__nav__wrapper__item'}
                        onClick={() => dispatch(setAuthModalActive(true))}
                    >
                        <RecentIcon color={'#56585C'} />
                    </div>
                }

                <div
                    className={'app__nav__wrapper__item'}
                >
                    <SettingsIcon color={'#56585C'} />
                </div>

                <ToggleMode/>
            </div>
            <div className={'app__nav__logout'}>
                {!isLogged ?
                    <div
                        className={'app__nav__wrapper__item'}
                        onClick={() => dispatch(setAuthModalActive(true))}
                    >
                        <LoginIcon color={'#56585C'} />
                    </div> :
                    <div
                        className={'app__nav__wrapper__item'}
                        onClick={() => logout()}
                    >
                        <LogoutIcon color={'#56585C'} />
                    </div>
                }
            </div>
        </nav>
    );
};

export default NavAside;