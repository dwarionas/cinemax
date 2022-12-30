import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../../redux/store'

import { setActiveCategory } from "../../redux/slices/homeSlice";

const NavHome: React.FC = () => {
    const dispatch = useDispatch();
    const { activeCategory } = useSelector((state: RootState)  => state.home);

    const values: string[] = ['All', 'Comedy', 'Fantasy', 'Drama', 'History', 'Horror'];

    return (
        <ul className={'home__ul'}>
            {
                values.map((el, i) => (
                    <li
                        onClick={() => dispatch(setActiveCategory(i))}
                        className={activeCategory === i ? 'home__ul__li__active' : 'home__ul__li'}
                        key={i}
                    >
                        {el}
                    </li>
                ))
            }
        </ul>
    );
};

export default NavHome;