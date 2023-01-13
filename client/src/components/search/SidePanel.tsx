import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api } from "../../api/api";


const SidePanel: React.FC = () => {
    const { detailsParams } = useSelector((state: RootState) => state.search);
    const { data, isLoading, isFetching, isUninitialized } = api.endpoints.getDetails.useQueryState(detailsParams)
    const res = data ? [data] : [];

    return (
        <div className={'search__panel'}>
            {isUninitialized && <span className={'search__panel-message'}>Please, select item</span>}

            {isLoading || isFetching ?
                <span className={'search__panel-lorem'}>Loading...</span>
            : res?.map((item, i) => (
                <div className={'search__panel-content'} key={item.id}>
                    <div>{item.title || item.name}</div>
                </div>
            ))}
        </div>
    );
};

export default SidePanel;