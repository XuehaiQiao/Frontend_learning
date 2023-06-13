import { configureStore } from '@reduxjs/toolkit';
import { wishlistReducer } from './wishlistReducer';

export type RootState = ReturnType<typeof wishlistReducer>;

const store = configureStore({
    reducer: wishlistReducer,
});

export default store;