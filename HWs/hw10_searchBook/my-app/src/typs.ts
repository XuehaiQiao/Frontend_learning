export interface Book {
    id: string;
    previewLink: string;
    title: string;
    authors: string[];
}

export interface WishlistState {
    wishlist: Book[];
}

export enum WishlistActionTypes {
    ADD_BOOK = 'ADD_BOOK',
    REMOVE_BOOK = 'REMOVE_BOOK',
}

export interface AddBookAction {
    type: WishlistActionTypes.ADD_BOOK;
    payload: Book;
}

export interface RemoveBookAction {
    type: WishlistActionTypes.REMOVE_BOOK;
    payload: string; // Book ID
}

export type WishlistAction = AddBookAction | RemoveBookAction;

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
};

export type FetchedData = {
    totalItems: number;
    items: Book[];
}