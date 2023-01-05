import React from 'react';
import { IGenre } from "../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IDetectGenresProps {
    genresArray: number[];
}

interface ISVGProps {
    color: string;
}

interface IStarProps {
    rate: number;
}

const width = '35px';
const height = '35px';


export const Home: React.FC<ISVGProps> = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
            <path fill={color}
                  d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"/>
        </svg>
    )
}

export const Profile: React.FC<ISVGProps> = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
            <path fill={color}
                  d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>
    )
}

export const Recent: React.FC<ISVGProps> = ({color}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" id="_24x24_On_Light_Recent" data-name="24x24/On Light/Recent" xmlns="http://www.w3.org/2000/svg">
            <rect id="view-box" width="24" height="24" fill="none"/>
            <path id="Shape" d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z" transform="translate(1.568 2.25)"
                  fill={color}/>
        </svg>
    )
}

export const Search: React.FC<ISVGProps> = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
            <path fill={color}
                  d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
    )
}

export const Settings: React.FC<ISVGProps> = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width={width} height={height}>
            <path fill={color}
                  d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z"/></svg>
    )
}

export const Logout: React.FC<ISVGProps> = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
            <path fill={color}
                  d="M12.59,13l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H3a1,1,0,0,0,0,2ZM12,2A10,10,0,0,0,3,7.55a1,1,0,0,0,1.8.9A8,8,0,1,1,12,20a7.93,7.93,0,0,1-7.16-4.45,1,1,0,0,0-1.8.9A10,10,0,1,0,12,2Z"/></svg>
    )
}

export const Play: React.FC = ({}) => {
    return (
        <button className={'home__main-button'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
                <path fill="#fff" d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z"/>
            </svg>
        </button>
    )
}

export const Plus: React.FC = ({}) => {
    return (
        <button className={'home__main-button'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
                <path fill="#fff" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/>
            </svg>
        </button>
    )
}


export const Star: React.FC<IStarProps> = ({rate}) => {
    const yellow = '#F9B601';
    const grey = '#9b9b9b';

    return (
        <div className={'home__main-stars'}>
            {
                [...Array(Math.round(rate / 2))].map(x => ++x).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" width={'30px'} height={'30px'} style={{marginRight: '4px'}}>
                        <path fill={yellow} d="M10 0l2.36 7.28L20 7.25l-6.19 4.47L16.19 19 10 14.48 3.83 19l2.36-7.28L0 7.25l7.66.03z"/>
                    </svg>
                ))
            }
            {
                [...Array(5 - Math.round(rate / 2))].map(x => ++x).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" width={'30px'} height={'30px'} style={{marginRight: '4px'}}>
                        <path fill={grey} d="M10 0l2.36 7.28L20 7.25l-6.19 4.47L16.19 19 10 14.48 3.83 19l2.36-7.28L0 7.25l7.66.03z"/>
                    </svg>
                ))
            }
        </div>
    )
}

export const DetectGenres: React.FC<IDetectGenresProps> = ({genresArray}) => {
    const { genresList } = useSelector((state: RootState) => state.home);

    const genres = genresArray.map(genre => genresList.filter(item => item.id === genre)).flat().map(item => item.name);

    return (
        <span className={'home__main-genre'} >
            <>{genres.join(' | ')}</>
        </span>
    )
}

