import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../../redux/store'
import { setActiveCategory, setActiveItem } from "../../redux/slices/homeSlice";
import { preventAnim } from "../AuxiliaryComponents";


const values: string[] = ['All', 'Comedy', 'Fantasy', 'Drama', 'Adventure', 'Horror'];

const NavHome: React.FC = () => {
    const dispatch = useDispatch();
    const { activeCategory } = useSelector((state: RootState)  => state.home);

    const changeCategory = (i: number): void => {
        dispatch(setActiveCategory(i));
        dispatch(setActiveItem(0));
        preventAnim();
    }

    return (
        <ul className={'home__ul'}>
            {
                values.map((el, i) => (
                    <li
                        onClick={() => changeCategory(i)}
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