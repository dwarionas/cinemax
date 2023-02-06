import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import { HomeIcon, ProfileIcon, RecentIcon, SearchIcon, SettingsIcon, LoginIcon, LogoutIcon } from "./Helpers";
import { setAuthModalActive, setIsLogged } from "../redux/slices/authSlice";

const NavAside: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLogged } = useSelector((state: RootState) => state.auth)

    const logout = () => {
        if (window.localStorage.getItem('isLogged') && window.localStorage.getItem('token')) {
            window.localStorage.removeItem('isLogged');
            window.localStorage.removeItem('token');
            dispatch(setIsLogged(false));
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

                <div
                    className={'app__nav__wrapper__item'}
                >
                    <ProfileIcon color={'#56585C'} />
                </div>

                <div
                    className={'app__nav__wrapper__item'}
                >
                    <RecentIcon color={'#56585C'} />
                </div>

                <div
                    className={'app__nav__wrapper__item'}
                >
                    <SettingsIcon color={'#56585C'} />
                </div>
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
                    </div>}

            </div>
        </nav>
    );
};

export default NavAside;