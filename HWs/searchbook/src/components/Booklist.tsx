import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Loader from "./Loader";
import { IBookItem, search, updatePage } from "../redux/slices/searchbookSlice";
import BookItem from "./BookItem";
import Pagination from "./Pagination";

interface BooklistProps {
    books: IBookItem[];
}
const Booklist: FC<BooklistProps> = ({ books }) => {
    const isLoading = useSelector<RootState, boolean>(
        (state) => state.searchbookSlice.isLoading
    );
    const wishlistBooks = useSelector<RootState, IBookItem[]>(
        (state) => state.wishlistSlice.books
    );
    const currentPage = useSelector<RootState, number>(
        (state) => state.searchbookSlice.currentPage
    );
    const totalPages = useSelector<RootState, number>(
        (state) => state.searchbookSlice.totalPages
    );
    const dispatch: AppDispatch = useDispatch();

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1) pageNumber = 1;
        if (pageNumber > totalPages) pageNumber = totalPages;
        dispatch(updatePage(pageNumber));
        dispatch(search());
    };

    return (
        <div className="book-list-container">
            {isLoading ? (
                <Loader />
            ) : books.length === 0 ? (
                "no result"
            ) : (
                <>
                    <ul className="book-list">
                        {books.map((book) => {
                            const liked = wishlistBooks.some(
                                (item) => item.id === book.id
                            );
                            return (
                                <BookItem
                                    key={book.id}
                                    liked={liked}
                                    item={book}
                                />
                            );
                        })}
                    </ul>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default Booklist;
