import React from 'react';
import { IData } from "../../types";

interface IProps {
    item: IData;
    onSelectItem: (id: number, type: string) => void;
}

const Recommendations: React.FC<IProps> = ({ item, onSelectItem }) => {
    return (
        <div onClick={() => onSelectItem(item.id, item.media_type)}>
            {item.id}: {item.title}
        </div>
    );
};

export default Recommendations;