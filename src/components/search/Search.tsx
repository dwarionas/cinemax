import React from 'react';
import qs from 'qs';
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom";
import '../../styles/search.scss';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { searchRequest, recommendationRequest, setQuery } from "../../redux/slices/searchSlice";

import Recommendations from "./Recommendations";
import SearchResults from "./SearchResults";
import { SearchIcon } from "../AuxiliaryComponents";
import Pagination from "./Pagination";


const Search: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
    const [isSearchSubmitted, setIsSearchSubmitted] = React.useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { searchData, recommendationData, query, currentPage, searchLoading } = useSelector((state: RootState) => state.search);

    React.useEffect(() => {
        if (!window.location.search) {
            dispatch(recommendationRequest());
        }
    }, []);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            dispatch(searchRequest({
                searchQuery: String(params.q),
                page: Number(params.p),
            }));
            dispatch(setQuery(String(params.q)))

            setIsSearchSubmitted(true);
        }
    }, []);

    React.useEffect(() => {
        if (isSearchSubmitted && query) {
            const queryString = qs.stringify({
                q: query,
                p: currentPage
            });

            navigate(`?${queryString}`);
        }
    }, [query, currentPage, isSearchSubmitted]);

    const onChangePage = (number: number) => {
        dispatch(searchRequest({
            searchQuery: query,
            page: number,
        }));
    };

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            if (str.length) {
                dispatch(searchRequest({
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
        if (query) {
            setIsSearchSubmitted(true);
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(event.target.value));
        updateSearchValue(event.target.value);
    }

    return (
        <div className={'search'}>
            <form onSubmit={onSubmitForm} className={'search__form'}>
                <div className={'search__form-input-wrapper'}>
                    <input
                        value={query}
                        onChange={(event) => onChangeInput(event)}
                        className={'search__form-input'}
                    />
                    <ul className={'search__form-ul'}>
                        {isPopupVisible && (
                            searchLoading ? <>Loading...</> : searchData.slice(0, 4).map((el, i) => (
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

            {isSearchSubmitted && <Pagination onChangePage={onChangePage} />}
        </div>
    );
};

export default Search;