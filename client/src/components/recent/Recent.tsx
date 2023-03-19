import React from 'react'
// import '../../styles/recent.scss'
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";

import SearchItem from '../search/SearchItem';

const Recent: React.FC = () => {
    const dispatch = useAppDispatch();

    const recentState = useSelector((state: RootState) => state.recent.recent);

    return (
        <div className='recent'>
            <div className="recent__title">Recent</div>
            <div className="recent__content">
                {
                    recentState.length ? recentState.map(item => (
                        <SearchItem item={item} key={item.id}/>
                    )) :
                    <span>There are no stored bookmarks</span>
                }
            </div>
        </div>
    )   
}

export default Recent