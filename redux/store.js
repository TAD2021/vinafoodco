import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from './cartSlice'
import authReducer from './authSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth'],
};

const reducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default store;