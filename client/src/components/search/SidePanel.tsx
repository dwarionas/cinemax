import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLazyQuery } from '@apollo/client';
import getDetails from '../../graphql/queries/search/details.graphql';
import { IDetalizedData } from '../../types';

const SidePanel: React.FC = () => {
    const { detailsParams } = useSelector((state: RootState) => state.search);

    const [refetch, details] = useLazyQuery(getDetails);

    React.useEffect(() => {
        if (detailsParams.type && detailsParams.id) {
            refetch({variables: detailsParams});
        }
    }, [detailsParams.type, detailsParams.id]);

    return (
        <div className={'search__panel'}>
            {(!details.data && !details.loading) && <span className={'search__panel-message'}>Please, select item</span>}

            {details.loading ?
                <span className={'search__panel-lorem'}>Loading...</span>
            : details.data?.getDetails.map((item: IDetalizedData) => (
                <div className={'search__panel-content'} key={item.id}>
                    <div>{item.title || item.name}</div>
                </div>
            ))}
        </div>
    );
};

export default SidePanel;