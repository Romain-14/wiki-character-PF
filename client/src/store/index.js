import {configureStore} from '@reduxjs/toolkit';
import characterReducer from './slices/character';
import articleReducer from './slices/article';
import userReducer from './slices/user';
import menuReducer from './slices/menu';

const store = configureStore({
    reducer: {
        character: characterReducer,
        article: articleReducer,
        user: userReducer,
        menu: menuReducer,
    },
});

export {store};