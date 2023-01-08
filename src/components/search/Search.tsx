import React from 'react';
import qs from 'qs';
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom";
import '../../styles/search.scss';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { searchRequest, searchSliceRequest, recommendationRequest, setQuery } from "../../redux/slices/searchSlice";

import Recommendations from "./Recommendations";
import SearchResults from "./SearchResults";
import { SearchIcon } from "../AuxiliaryComponents";
import Pagination from "./Pagination";


const Search: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { searchData,
        recommendationData,
        slicedSearchData,
        query,
        currentPage,
        searchLoading } = useSelector((state: RootState) => state.search);

    const [localPage, setLocalPage] = React.useState<number>(1);
    const [localQuery, setLocalQuery] = React.useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
    const [isSearchSubmitted, setIsSearchSubmitted] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            setIsSearchSubmitted(true);
            dispatch(searchRequest({
                searchQuery: String(params.q),
                page: Number(params.p),
            }));

            setLocalPage(Number(params.p));
            setLocalQuery(String(params.q));
            dispatch(setQuery(String(params.q)));
        } else {
            dispatch(recommendationRequest());
        }
    }, []);

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

    return (
        <div className={'search'}>
            <form onSubmit={onSubmitForm} className={'search__form'}>
                <div className={'search__form-input-wrapper'}>
                    <input
                        value={localQuery}
                        onChange={(event) => onChangeInput(event)}
                        className={'search__form-input'}
                    />
                    <ul className={'search__form-ul'}>
                        {isPopupVisible && (
                            slicedSearchData && slicedSearchData.map((el, i) => (
                                <li className={'search__form-ul-li'} key={el.id} >{el.title || el.name}</li>
                            ))
                        )}
                        {isPopupVisible && <li className={'search__form-ul-li'}>Load more data...</li>}
                    </ul>
                </div>

                <button type="submit" className={'search__form-btn'}><SearchIcon color={'#fff'}/></button>
            </form>

            {
                isSearchSubmitted ?
                    <div className={'search__results'}>
                        {searchData && searchData.map((item, i) => (
                            <SearchResults key={item.id} item={item} />
                        ))}
                    </div>
                :
                    <div className={'search__recommendations'}>
                        {recommendationData && recommendationData.map((item, i) => (
                            <Recommendations key={item.id} item={item} />
                        ))}
                    </div>

            }

            {isSearchSubmitted && <Pagination onChangePage={onChangePage} setLocalPage={setLocalPage} />}
        </div>
    );
};

export default Search;