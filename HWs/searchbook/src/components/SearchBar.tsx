import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { search, searchSuggestions, updateKeyword, updateSuggestions, updateShowSelection, clearSuggestions } from "../redux/slices/searchbookSlice";

const SearchBar = () => {
    const dispatch: AppDispatch = useDispatch();
    const keyword = useSelector<RootState, string>(state => state.searchbookSlice.keyword);
    const suggestions = useSelector<RootState, string[]>(state => state.searchbookSlice.suggestions);
    const showSelection = useSelector<RootState, boolean>(state => state.searchbookSlice.showSelection);

    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(updateKeyword(e.currentTarget.dataset.title));
        dispatch(search());
        dispatch(searchSuggestions());
    };

    const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateKeyword(e.target.value));
        dispatch(searchSuggestions());
    };

    const handleSubmit = () => {
        dispatch(search());
    };

    return (
        <div className="search-bar">
            <input 
            value={keyword} 
            onChange={handleKeyWordChange} 
            onBlur={(e) => {
                console.log("blur");
                dispatch(updateShowSelection(false));
            }}
            onFocus={(e) => {
                console.log("focus");
                dispatch(updateShowSelection(true));
            }}
            />
            <button onClick={handleSubmit}>search</button>

            {showSelection && suggestions.length && (
                <ul className="suggestion-dropdown">
                    {suggestions.map((suggest, index) => (
                        <li
                            key={`suggestion-${index}`}
                            className="suggestion-item"
                            onMouseDown={handleSelect}
                            data-title={suggest}
                        >
                            <p className="suggestion-title">
                                {suggest.length <= 50 ? suggest : suggest.substring(0, 50) + '...'}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
