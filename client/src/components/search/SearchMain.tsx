import React from 'react';
import qs from 'qs';
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom";
import '../../styles/search.scss';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { setQuery, setDetailsParams } from "../../redux/slices/searchSlice";

import { useQuery, useLazyQuery } from '@apollo/client';
import getRec from '../../queries/search/rec.graphql';
import getSearch from '../../queries/search/search.graphql';
import getSliced from '../../queries/search/sliced.graphql';

import Recommendations from "./Recommendations";
import SearchResults from "./SearchResults";
import { SearchIcon } from "../Helpers";
import Pagination from "./Pagination";
import { IData } from "../../types";

const SearchMain: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { query, currentPage, searchTotalResults } = useSelector((state: RootState) => state.search);

    const rec = useQuery(getRec);
    const search = useQuery(getSearch);
    const sliced = useQuery(getSliced);

    const [localPage, setLocalPage] = React.useState<number>(1);
    const [localQuery, setLocalQuery] = React.useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
    const [isSearchSubmitted, setIsSearchSubmitted] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            if (!params.q || !params.p) {
                setIsSearchSubmitted(false);
                rec.refetch();
                navigate('/search');
                return () => {};
            }

            setIsSearchSubmitted(true);
            search.refetch({
                searchQuery: String(params.q),
                page: Number(params.p),
            });

            setLocalPage(Number(params.p));
            setLocalQuery(String(params.q));
            dispatch(setQuery(String(params.q)));

        } else {

            setIsSearchSubmitted(false);
            setIsPopupVisible(false);
            setLocalQuery('');
            rec.refetch();

        }
    }, [window.location.search]);

    React.useEffect(() => {
        if (isSearchSubmitted) {
            const queryString = qs.stringify({
                q: localQuery,
                p: localPage
            });

            navigate(`?${queryString}`);
        }
    }, [ query, currentPage, isSearchSubmitted ]);

    const onChangePage = (number: number) => {
        search.refetch({
            searchQuery: query,
            page: number,
        });
    };

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            if (str.length) {
                sliced.refetch({
                    searchQuery: str,
                    page: 1,
                })
                setIsPopupVisible(true);
            } else {
                setIsPopupVisible(false);
            }
        }, 500),
        [],
    );

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPopupVisible(false);

        if (localQuery) {
            setIsSearchSubmitted(true);
            setLocalPage(1);
            dispatch(setQuery(localQuery));

            search.refetch({
                searchQuery: localQuery,
                page: 1,
            })
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQuery(event.target.value);
        updateSearchValue(event.target.value);
    }

    const onSelectItem = (id: number, type: string) => {
        dispatch(setDetailsParams({id, type}))
    }

    return (
        <div className={'search__main'}>
            <form onSubmit={onSubmitForm} className={'search__form'}>
                <div className={'search__form-input-wrapper'}>
                    <input
                        value={localQuery}
                        onChange={(event) => onChangeInput(event)}
                        className={'search__form-input'}
                    />
                    <ul className={'search__form-ul'}>
                        {isPopupVisible && (sliced.loading ? <>Loading...</> : (
                            sliced.data?.getSliced.map((el: IData) => (
                                <li className={'search__form-ul-li'} key={el.id} >{el.title || el.name}</li>
                            ))
                        ))}

                        {isPopupVisible && !sliced.loading ?
                            <li className={'search__form-ul-li'}>Load more data... ({searchTotalResults})</li> : null}
                    </ul>
                </div>

                <button type="submit" className={'search__form-btn'}><SearchIcon color={'#fff'}/></button>
            </form>

            {
                isSearchSubmitted ?
                    <div className={'search__results'}>
                        {search.data?.getSearch.map((item: IData) => (
                            <SearchResults key={item.id} item={item} onSelectItem={onSelectItem} />
                        ))}
                    </div>
                :
                    <div className={'search__recommendations'}>
                        {rec.data?.getRec.map((item: IData) => (
                            <Recommendations key={item.id} item={item} onSelectItem={onSelectItem} />
                        ))}
                    </div>

            }

            {isSearchSubmitted &&
                <Pagination
                    totalPages={search.data ? search.data.total_pages : 1}
                    onChangePage={onChangePage}
                    setLocalPage={setLocalPage}
                    localPage={localPage} />}
        </div>
    );
};

export default SearchMain;