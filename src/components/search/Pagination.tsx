import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setCurrentPage } from "../../redux/slices/searchSlice";

interface IProps {
    onChangePage: (e: number) => void;
    setLocalPage: React.Dispatch<React.SetStateAction<number>>;
    localPage: number;
}

const Pagination: React.FC<IProps> = ({ onChangePage, setLocalPage, localPage }) => {
    const dispatch = useAppDispatch();
    const { searchTotalPages } = useSelector((state: RootState) => state.search);

    return (
        <ReactPaginate
            className={'search__pagination'}
            pageClassName={'search__pagination-page'}
            activeClassName={'search__pagination-page-active'}
            containerClassName={'search__pagination-container'}
            breakClassName={'search__pagination-break'}
            disabledClassName={'search__pagination-disabled'}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => {
                setLocalPage(e.selected + 1)
                onChangePage(e.selected + 1)
                dispatch(setCurrentPage(e.selected + 1))
            }}
            pageRangeDisplayed={10}
            pageCount={searchTotalPages > 40 ? 40 : searchTotalPages}
            // forcePage={localPage}
        />
    );
};

export default Pagination;