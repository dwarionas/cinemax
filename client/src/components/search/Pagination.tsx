import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setCurrentPage } from "../../redux/slices/searchSlice";

interface IProps {
    totalPages: number;
    onChangePage: (e: number) => void;
    setLocalPage: React.Dispatch<React.SetStateAction<number>>;
    localPage: number;
}

const Pagination: React.FC<IProps> = ({ onChangePage, setLocalPage, localPage, totalPages }) => {
    const dispatch = useAppDispatch();

    return (
        <ReactPaginate
            className={'search__main-pagination'}
            pageClassName={'search__main-pagination-page'}
            activeClassName={'search__main-pagination-page-active'}
            breakClassName={'search__main-pagination-page-break'}
            disabledClassName={'search__main-pagination-page-disabled'}
            previousClassName={'search__main-pagination-page-prev'}
            nextClassName={'search__main-pagination-page-next'}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => {
                setLocalPage(e.selected + 1)
                onChangePage(e.selected + 1)
                dispatch(setCurrentPage(e.selected + 1))
                scrollTo(0, 0)
            }}
            pageRangeDisplayed={10}
            pageCount={totalPages > 40 ? 40 : totalPages}
        // forcePage={localPage}
        />
    );
};

export default Pagination;