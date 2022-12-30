import React from 'react';
import { NavLink } from "react-router-dom";
import { Home, Profile, Recent, Search, Settings, Logout } from "./Icons";

const NavAside: React.FC = () => {
    return (
        <nav className={'app__nav'}>
            <div className={'app__nav__wrapper'}>
                <NavLink
                    to={'/'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <Home color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/profile'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <Profile color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/settings'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <Settings color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/recent'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <Recent color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/search'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <Search color={isActive ? '#fff' : '#56585C'} />}
                />
            </div>
            <div className={'app__nav__logout'}>
                <NavLink
                    to={'/logout'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <Logout color={isActive ? '#fff' : '#56585C'} />}
                />
            </div>
        </nav>
    );
};

export default NavAside;