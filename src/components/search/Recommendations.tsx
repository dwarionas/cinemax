import React from 'react';
import { IData } from "../../types";

interface IProps {
    item: IData;
}

const Recommendations: React.FC<IProps> = ({ item }) => {
    return (
        <div>
            {item.id}: {item.title}
        </div>
    );
};

export default Recommendations;