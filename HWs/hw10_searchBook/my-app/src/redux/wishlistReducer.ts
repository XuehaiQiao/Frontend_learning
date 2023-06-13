import { WishlistAction, WishlistActionTypes, WishlistState, Book } from "../typs";

const initialState: WishlistState = {
    wishlist: [],
};

export const wishlistReducer = (state = initialState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case WishlistActionTypes.ADD_BOOK:
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload],
            };
        case WishlistActionTypes.REMOVE_BOOK:
            return {
                ...state,
                wishlist: state.wishlist.filter((book) => book.id !== action.payload),
            };
        default:
            return state;
    }
};

export const addBook = (book: Book) => {
    return {
        type: WishlistActionTypes.ADD_BOOK,
        payload: book,
    };
};

export const removeBook = (bookId: string) => {
    return {
        type: WishlistActionTypes.REMOVE_BOOK,
        payload: bookId,
    };
};