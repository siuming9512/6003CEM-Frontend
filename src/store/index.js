
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import userSlice from './userSlice'
import chatroomSlice from './chatroomSlice'
import loginSlice from './loginSlice'
import searchBarSlice from './searchBarSlice';
import petSlice from './petSlice';


const reducers = combineReducers({
    user: userSlice,
    chatroom: chatroomSlice,
    loginPage: loginSlice,
    searchBar: searchBarSlice,
    pets: petSlice
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['searchBar']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})
export const persistor = persistStore(store)
