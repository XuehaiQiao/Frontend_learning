import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore, AnyAction, Reducer } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { initWishlist } from "../redux/slices/wishlistSlice";
import Wishlist from "../pages/Wishlist";


const book1 = {
    id: "1",
    volumeInfo: {
        description: "Book 1 Description",
        authors: ["Author 1"],
        title: "Book 1",
        publishedDate: "2022-01-01",
        imageLinks: {
            smallThumbnail: "book1-small-thumbnail.jpg",
            thumbnail: "book1-thumbnail.jpg",
        },
    },
};

const book2 = {
    id: "2",
    volumeInfo: {
        description: "Book 2 Description",
        authors: ["Author 2"],
        title: "Book 2",
        publishedDate: "2022-02-02",
        imageLinks: {
            smallThumbnail: "book2-small-thumbnail.jpg",
            thumbnail: "book2-thumbnail.jpg",
        },
    },
};

const initialState = {
    wishlistSlice: {
        books: [book1, book2],
    },
};

describe("Wishlist", () => {
    let store: EnhancedStore<RootState, AnyAction>;

    // beforeEach(() => {
    //     const emptyReducer: Reducer<any, AnyAction> = (state = {books: []}) => state;

    //     store = configureStore({
    //         reducer: {
    //             searchbookSlice: emptyReducer,
    //             wishlistSlice: emptyReducer,
    //           },
    //     });
    // });

    test("renders wishlist items correctly", () => {
        const emptyReducer: Reducer<any, AnyAction> = (state = initialState.wishlistSlice) => state;
        store = configureStore({
            reducer: {
                searchbookSlice: emptyReducer,
                wishlistSlice: emptyReducer,
              },
        });

        render(
            <Provider store={store}>
                <Wishlist />
            </Provider>
        );

        expect(screen.getByText("Book 1")).toBeInTheDocument();
        expect(screen.getByText("Book 1 Description")).toBeInTheDocument();
        expect(screen.getByText("Author 1")).toBeInTheDocument();
        expect(screen.getByText("Book 2")).toBeInTheDocument();
        expect(screen.getByText("Book 2 Description")).toBeInTheDocument();
        expect(screen.getByText("Author 2")).toBeInTheDocument();
        // ... assert other properties or elements based on your component's rendering
    });
});