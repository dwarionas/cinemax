import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setCurrentPage } from "../../redux/slices/searchSlice";

interface IProps {
    onChangePage: (e: number) => void;
}

const Pagination: React.FC<IProps> = ({ onChangePage }) => {
    const dispatch = useAppDispatch();
    const { searchTotalPages } = useSelector((state: RootState) => state.search);

    return (
        <ReactPaginate
            className={'search__pagination'}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => {
                onChangePage(e.selected + 1)
                dispatch(setCurrentPage(e.selected + 1))
            }}
            pageRangeDisplayed={10}
            pageCount={searchTotalPages > 40 ? 40 : searchTotalPages}
            // forcePage={currentPage - 1}
        />
    );
};

export default Pagination;