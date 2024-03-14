// store.js

import { configureStore } from '@reduxjs/toolkit';
import privPageReducer from './privPageSlice';
import pubPageReducer from './pubPageSlice';
import { combineReducers } from 'redux';
import { getDefaultConfig } from 'expo/metro-config';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Combine reducers
const rootReducer = combineReducers({
    privPage: privPageReducer,
    pubPage: pubPageReducer
});

// Create the store with the combined reducers
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export default store;

