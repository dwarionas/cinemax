import React from 'react';
import qs from 'qs';
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom";
import '../../styles/search.scss';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import {
    searchRequest,
    searchSliceRequest,
    recommendationRequest,
    detailsRequest,
    setQuery,
    setCurrentPage
} from "../../redux/slices/searchSlice";

import Recommendations from "./Recommendations";
import SearchResults from "./SearchResults";
import { SearchIcon } from "../AuxiliaryComponents";
import Pagination from "./Pagination";


const SearchMain: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        searchData,
        recommendationData,
        slicedSearchData,
        query,
        currentPage,
        slicedLoading,
        searchLoading,
        searchTotalResults
    } = useSelector((state: RootState) => state.search);

    const [localPage, setLocalPage] = React.useState<number>(1);
    const [localQuery, setLocalQuery] = React.useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
    const [isSearchSubmitted, setIsSearchSubmitted] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            if (!params.q || !params.p) {
                setIsSearchSubmitted(false);
                dispatch(recommendationRequest());
                navigate('/search');
                return () => {};
            }

            setIsSearchSubmitted(true);
            dispatch(searchRequest({
                searchQuery: String(params.q),
                page: Number(params.p),
            }));

            setLocalPage(Number(params.p));
            setLocalQuery(String(params.q));
            dispatch(setQuery(String(params.q)));

        } else {

            setIsSearchSubmitted(false);
            setIsPopupVisible(false);
            setLocalQuery('');
            dispatch(recommendationRequest());

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
        dispatch(searchRequest({
            searchQuery: query,
            page: number,
        }));
    };

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            if (str.length) {
                dispatch(searchSliceRequest({
                    searchQuery: str,
                    page: 1,
                }));
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
console.log(isPopupVisible)
        if (localQuery) {
            setIsSearchSubmitted(true);
            setLocalPage(1);
            dispatch(setQuery(localQuery));
            dispatch(searchRequest({
                searchQuery: localQuery,
                page: 1,
            }));
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQuery(event.target.value);
        updateSearchValue(event.target.value);
    }

    const onSelectItem = (id: number, type: string) => {
        dispatch(detailsRequest({id, type}))
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
                        {isPopupVisible && (slicedLoading ? <>Loading...</> : (
                            slicedSearchData.map((el, i) => (
                                <li className={'search__form-ul-li'} key={el.id} >{el.title || el.name}</li>
                            ))
                        ))}

                        {isPopupVisible && !slicedLoading ?
                            <li className={'search__form-ul-li'}>Load more data... ({searchTotalResults})</li> : null}
                    </ul>
                </div>

                <button type="submit" className={'search__form-btn'}><SearchIcon color={'#fff'}/></button>
            </form>

            {
                isSearchSubmitted ?
                    <div className={'search__results'}>
                        {searchData && searchData.map((item, i) => (
                            <SearchResults key={item.id} item={item} onSelectItem={onSelectItem} />
                        ))}
                    </div>
                :
                    <div className={'search__recommendations'}>
                        {recommendationData && recommendationData.map((item, i) => (
                            <Recommendations key={item.id} item={item} onSelectItem={onSelectItem} />
                        ))}
                    </div>

            }

            {isSearchSubmitted &&
                <Pagination
                    onChangePage={onChangePage}
                    setLocalPage={setLocalPage}
                    localPage={localPage} />}
        </div>
    );
};

export default SearchMain;