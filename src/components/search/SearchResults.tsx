import React from 'react';
import { IData } from "../../types";

interface IProps {
    item: IData;
    onSelectItem: (id: number, type: string) => void;
}

const SearchResults: React.FC<IProps> = ({ item, onSelectItem }) => {
    return (
        <div onClick={() => onSelectItem(item.id, item.media_type)}>
            {item.id}: {item.title || item.name}
        </div>
    );
};

export default SearchResults;