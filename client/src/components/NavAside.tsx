import React from 'react';
import { NavLink } from "react-router-dom";
import { HomeIcon, ProfileIcon, RecentIcon, SearchIcon, SettingsIcon, LogoutIcon } from "./AuxiliaryComponents";

const NavAside: React.FC = () => {
    return (
        <nav className={'app__nav'}>
            <div className={'app__nav__wrapper'}>
                <NavLink
                    to={'/'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <HomeIcon color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/search'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <SearchIcon color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/recent'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <RecentIcon color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/profile'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <ProfileIcon color={isActive ? '#fff' : '#56585C'} />}
                />

                <NavLink
                    to={'/settings'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <SettingsIcon color={isActive ? '#fff' : '#56585C'} />}
                />
            </div>
            <div className={'app__nav__logout'}>
                <NavLink
                    to={'/logout'}
                    className={'app__nav__wrapper__item'}
                    children={({isActive}) => <LogoutIcon color={isActive ? '#fff' : '#56585C'} />}
                />
            </div>
        </nav>
    );
};

export default NavAside;