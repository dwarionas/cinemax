import React from 'react'
import '../../styles/single.scss'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import getDetails from '../../graphql/queries/single/details.graphql';
import getDiscover from '../../graphql/queries/single/discover.graphql';
import addBookmark from '../../graphql/mutations/bookmarking/AddBookmark.graphql';
import { IData, IDetalizedData, IGenre } from '../../types';

import { PlayIcon, RemoveIcon, PlusIcon, Rating } from '../Helpers';
import { createBookmark } from '../bookmarking/addBookmark';

import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { setBookmarks } from '../../redux/slices/authSlice';

const Single: React.FC = () => {
    const params = useParams();

    const { data: details } = useQuery(getDetails, {
        variables: {
            type: params.type,
            id: Number(params.id)
        }
    })

    const [fetchDiscover, { data: discover }] = useLazyQuery(getDiscover);

    React.useEffect(() => {
        if (details?.getDetails) {
            fetchDiscover({ variables: { genres: details.getDetails[0].genres.map((item: IGenre) => item.name).join(', ') } })
        }
    }, [details]);

    const dispatch = useAppDispatch();
    const userID = useSelector((state: RootState) => state.auth.user.id)
    const bookmarks = useSelector((state: RootState) => state.auth.user.bookmarks)

    const [bookmark] = useMutation(addBookmark);

    return (
        <>
            {details?.getDetails.map((item: IDetalizedData) => (
                <div className="single" key={item.id}>
                    <div className="single__main">
                        <div className="single__main-head">
                            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />
                            <div className="single__main-head-items">
                                <div className="single__main-head-items-title">{item.name || item.title}</div>
                                <span style={{ color: 'grey' }}>
                                    {item.first_air_date?.slice(0, 4) || item.release_date?.slice(0, 4)} | {item.tagline}
                                </span>
                                <div style={{ color: 'grey' }}>Languages: {item.spoken_languages.map((item) => item.english_name).join(', ')}</div>
                                <div className="single__main-head-items-genres">
                                    {item.genres.map((item) => item.name).join(', ')}
                                </div>
                                <span style={{ color: 'grey' }}>{item.production_countries.map((item) => item.name).join(', ')}</span>
                                <div className="single__main-head-items-wrapper">
                                    <span style={{ alignSelf: 'center' }}><Rating rate={item.vote_average} /></span>
                                    <div className={'home__main-buttons'} style={{ margin: '0', marginLeft: '10px' }}>
                                        <button className={'home__main-button'}><PlayIcon /></button>
                                        {bookmarks.find(({ id }) => id === item.id)
                                            ?
                                            <div
                                                className={'home__main-button'}
                                                onClick={() => console.log('removed')}
                                            >
                                                <RemoveIcon />

                                            </div>
                                            :
                                            <div
                                                className={'home__main-button'}
                                                onClick={() => createBookmark({
                                                    bookmark,
                                                    setBookmarks,
                                                    dispatch,
                                                    id: item.id,
                                                    name: item.name as string,
                                                    poster_path: item.poster_path as string,
                                                    title: item.title,
                                                    first_air_date: item.first_air_date,
                                                    release_date: item.release_date,
                                                    userID
                                                })}
                                            >
                                                <PlusIcon />

                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single__main-content">
                            <div className="single__main-content-info">
                                <div className="single__main-content-info-runtime">
                                    • Runtime: <span style={{ color: 'gray' }}>{item.runtime || item.episode_run_time}m</span>
                                </div>

                                <div className="single__main-content-info-companies">
                                    <span style={{ fontSize: '20px', marginBottom: '10px' }}>• Production companies</span>
                                    <ul>
                                        {item.production_companies.map(el => (
                                            <li>{el.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="single__main-content-descr">
                                <span style={{ fontSize: '20px', marginBottom: '10px' }}>Overview</span>
                                <span style={{ color: 'gray', fontSize: '17px' }}>{item.overview}</span>
                            </div>

                            <div className="single__main-content-people">
                                <div className="single__main-content-people-createdby">
                                    {item.created_by ?
                                        <>
                                            <span style={{ fontSize: '20px', marginBottom: '10px' }}>Created by</span>
                                            {item.created_by?.map(el => (
                                                <div key={el.id} style={{ display: 'flex' }}>
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/original${el.profile_path}`}
                                                        className={'single__main-content-people-createdby-img'}
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <span style={{ fontSize: '17px', color: 'grey', alignSelf: 'center' }}>• {el.name}</span>
                                                </div>
                                            ))}
                                        </>
                                        :
                                        <>
                                            <span style={{ fontSize: '20px', marginBottom: '10px' }}>Belongs to collection</span>
                                            <div key={item.belongs_to_collection?.id} style={{ display: 'flex' }}>
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${item.belongs_to_collection?.poster_path}`}
                                                    className={'single__main-content-people-createdby-img'}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <span style={{ fontSize: '17px', color: 'grey', alignSelf: 'center' }}>• {item.belongs_to_collection?.name || 'None'}</span>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='single__divider' /> */}

                    <div className="single__similar">
                        <span className='single__similar-title'>More like this</span>

                        {discover?.getDiscover.filter((el: IData) => el.id !== item.id).map((el: IData) => (
                            <div className="single__similar-item">
                                <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} />
                                <div className="single__similar-item-wrapper">
                                    <Link to={`/${el.first_air_date ? 'tv' : 'movie'}/${el.id}`}>
                                        <span className="single__similar-item-wrapper-title">{el.title || el.name}</span>
                                    </Link>
                                    <span style={{ color: 'grey' }}>
                                        {item.first_air_date?.slice(0, 4) || item.release_date?.slice(0, 4)}
                                    </span>
                                    <Rating rate={el.vote_average} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}

export default Single