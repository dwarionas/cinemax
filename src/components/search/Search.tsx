import React from 'react';
import SearchMain from "./SearchMain";
import SidePanel from "./SidePanel";

const Search: React.FC = () => {
    return (
        <div className={'search'}>
            <SearchMain/>
            <SidePanel/>
        </div>
    );
};

export default Search;