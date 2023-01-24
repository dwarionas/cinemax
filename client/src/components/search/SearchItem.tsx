import React from 'react';
import { IData } from "../../types";
import { PlayIcon, PlusIcon } from '../Helpers';

interface IProps {
    item: IData;
    onSelectItem: (id: number, type: string) => void;
}

const SearchItem: React.FC<IProps> = ({ item, onSelectItem }) => {
    return (
        <div onClick={() => onSelectItem(item.id, item.media_type)} className={'search__main-content-wrapper-item'}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <span style={{fontSize: '15px'}}>{item.title || item.name}</span>
                <span style={{color: 'grey'}}>{item.first_air_date?.slice(0, 4) || item.release_date?.slice(0, 4)}</span>
            </div>

            <div>
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} className={'search__main-content-wrapper-item-image'} />
                <div className='search__main-content-wrapper-item-btns'>
                    <PlayIcon classText={'search__main-content-wrapper-item-btn'}/>
                    <PlusIcon classText={'search__main-content-wrapper-item-btn'}/>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;