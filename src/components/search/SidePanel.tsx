import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../redux/store";

const SidePanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { detalizedData, detalizedLoading } = useSelector((state: RootState) => state.search);

    return (
        <div className={'search__panel'}>
            {!detalizedData.length && <span className={'search__panel-lorem'}>Please, select item</span>}
            {detalizedLoading ?
                <span className={'search__panel-lorem'}>Loading...</span>
            : detalizedData.map((item, i) => (
                <div>{item.title || item.name}</div>
            ))}

        </div>
    );
};

export default SidePanel;