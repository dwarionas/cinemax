import React from 'react';
import qs from 'qs';
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom";
// import '../../styles/search.scss';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";
import { setQuery } from "../../redux/slices/searchSlice";

import { useLazyQuery } from '@apollo/client';
import getRec from '../../graphql/queries/search/rec.graphql';
import getSearch from '../../graphql/queries/search/search.graphql';
import getSliced from '../../graphql/queries/search/sliced.graphql';

import SearchItem from "./SearchItem";
import Form from './Form';
import Pagination from "./Pagination";
import ItemSkeleton from './ItemSkeleton';
import { IData } from "../../types";


const SearchMain: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { query, currentPage } = useSelector((state: RootState) => state.search);

    const [refetchRec, rec] = useLazyQuery(getRec);
    const [refetchSearch, search] = useLazyQuery(getSearch);
    const [refetchSliced, sliced] = useLazyQuery(getSliced);

    const [localPage, setLocalPage] = React.useState<number>(1);
    const [localQuery, setLocalQuery] = React.useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = React.useState<boolean>(false);
    const [isSearchSubmitted, setIsSearchSubmitted] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            if (!params.q || !params.p) {
                setIsSearchSubmitted(false);
                refetchRec();
                navigate('/search');
                return () => { };
            }

            setIsSearchSubmitted(true);
            refetchSearch({
                variables: {
                    searchQuery: String(params.q),
                    page: Number(params.p),
                }
            });

            setLocalPage(Number(params.p));
            setLocalQuery(String(params.q));
            dispatch(setQuery(String(params.q)));
        } else {
            setIsSearchSubmitted(false);
            setIsPopupVisible(false);
            setLocalQuery('');
            refetchRec();
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
    }, [query, currentPage, isSearchSubmitted]);

    const onChangePage = (number: number) => {
        refetchSearch({
            variables: {
                searchQuery: query,
                page: number,
            }
        });
    };

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            if (str.length) {
                refetchSliced({
                    variables: {
                        searchQuery: str,
                        page: 1,
                    }
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

            refetchSearch({
                variables: {
                    searchQuery: localQuery,
                    page: 1,
                }
            })
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQuery(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <div className={'search__main'}>
            <Form
                onSubmitForm={onSubmitForm}
                localQuery={localQuery}
                onChangeInput={onChangeInput}
                isPopupVisible={isPopupVisible}
                sliced={sliced}
                setLocalQuery={setLocalQuery}
                setIsPopupVisible={setIsPopupVisible}
            />

            {
                isSearchSubmitted ?
                    <div className={'search__main-content'}>
                        <span className={'search__main-content-title'}>Search results:</span>
                        <div className={'search__main-content-wrapper'}>
                            {
                                search.loading && !search.data ?
                                    [...Array(20)].map((_, i) => (
                                        <ItemSkeleton key={i} />
                                    ))
                                    :
                                    search.data?.getSearch.results.map((item: IData) => (
                                        <SearchItem key={item.id} item={item} />
                                    ))
                            }
                        </div>
                    </div>
                    :
                    <div className={'search__main-content'}>
                        <span className={'search__main-content-title'}>Recommendations:</span>
                        <div className={'search__main-content-wrapper'}>
                            {
                                rec.loading && !rec.data ?
                                    [...Array(20)].map((_, i) => (
                                        <ItemSkeleton key={i} />
                                    ))
                                    :
                                    rec.data?.getRec.map((item: IData) => (
                                        <SearchItem key={item.id} item={item} />
                                    ))
                            }
                        </div>
                    </div>
            }

            {isSearchSubmitted &&
                <Pagination
                    totalPages={search.data ? search.data.getSearch.total_pages : 1}
                    onChangePage={onChangePage}
                    setLocalPage={setLocalPage}
                    localPage={localPage} />}
        </div>
    );
};

export default SearchMain;