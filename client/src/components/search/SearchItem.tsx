import React from 'react';
import { IData } from "../../types";
import { PlayIcon, PlusIcon } from '../Helpers';

interface IProps {
    item: IData;
    onSelectItem: (id: number, type: string) => void;
}

const SearchItem: React.FC<IProps> = ({ item, onSelectItem }) => {
    const [hover, setHover] = React.useState<boolean>(false)

    return (
        <div
            onClick={() => onSelectItem(item.id, item.media_type)}
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
                    <PlayIcon classText={'search__main-content-wrapper-item-container-btn'} id={item.id} />
                    <PlusIcon classText={'search__main-content-wrapper-item-container-btn'} />
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