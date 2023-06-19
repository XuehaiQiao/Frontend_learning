import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { stat } from "fs";

export interface IBookItem {
    id: string;
    volumeInfo: {
        description: string | undefined;
        authors: string[] | undefined;
        title: string | undefined;
        publishedDate: string | undefined;
        imageLinks:
        | {
            smallThumbnail: string | undefined;
            thumbnail: string | undefined;
        }
        | undefined;
    };
}

interface SearchbookState {
    books: IBookItem[];
    keyword: string;
    isLoading: boolean;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    suggestions: string[]; // auto-complete
    showSelection: boolean;
    keywordChanged: boolean;
}

const initialState: SearchbookState = {
    books: [],
    keyword: "",
    isLoading: false,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
    suggestions: [],
    showSelection: false,
    keywordChanged: true,
};

export const search = createAsyncThunk<
    // Return type of the payload creator
    any,
    // First argument to the payload creator
    undefined,
    {
        // Optional fields for defining thunkApi field types
        dispatch: AppDispatch;
        state: RootState;
    }
>("searchbook/search", async (args, thunkAPI) => {
    const { keyword, currentPage, itemsPerPage } =
        thunkAPI.getState().searchbookSlice;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const maxResults = itemsPerPage;
    const result = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    const res = await result.json();
    console.log("res", res);
    return res;
});

export const searchSuggestions = createAsyncThunk<
    any,
    undefined,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>("searchbook/searchSuggestions", async (args, thunkAPI) => {
    const { keyword } = thunkAPI.getState().searchbookSlice;
    const result = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=0&maxResults=5`
    );
    const res = await result.json();
    return res;
});

const searchbookSlice = createSlice({
    name: "searchbook",
    initialState,
    reducers: {
        updateKeyword: (state, action) => {
            state.keyword = action.payload;
            state.keywordChanged = true;
        },
        updatePage: (state, action) => {
            const newPage = action.payload;
            if (!(newPage > state.totalPages) && newPage >= 1) {
                state.currentPage = action.payload;
            }
        },
        // auto-complete
        updateSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
        clearSuggestions: (state) => {
            state.suggestions = [];
        },
        updateShowSelection: (state, action) => {
            state.showSelection = action.payload;
        },
        updateTextChanged: (state) => {
            state.keywordChanged = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(search.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.isLoading = false;
                if(action.payload.items) {
                    state.books = action.payload.items;
                }
                else {
                    console.log('search no result');
                    state.books = [];
                }
                
                state.totalPages = Math.ceil(
                    action.payload.totalItems / state.itemsPerPage
                );
                
                if(state.keywordChanged) {
                    state.currentPage = 1;
                    state.keywordChanged = false;
                }
            })
            .addCase(search.rejected, (state, action) => {
                console.log("err", action.error.message);
                state.isLoading = false;
                //show alert
            })
            .addCase(searchSuggestions.pending, (state, action) => {
                state.suggestions = [];
            })
            .addCase(searchSuggestions.fulfilled, (state, action) => {
                if(action.payload.items && action.payload.items.length) {
                    state.suggestions = action.payload.items.map((book: IBookItem) => book.volumeInfo.title);
                }
                else {
                    console.log('seachSuggestions no result');
                }
            });
    },
});

export const { updateKeyword, updatePage, updateSuggestions, updateShowSelection, clearSuggestions } = searchbookSlice.actions;

export default searchbookSlice.reducer;
