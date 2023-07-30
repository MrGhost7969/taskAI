// store.js

import { configureStore } from '@reduxjs/toolkit';
import privPageReducer from './privPageSlice';
import pubPageReducer from './pubPageSlice'
const store = configureStore({
  reducer: {
    privPage: privPageReducer,
    pubPage: pubPageReducer
  },
});

export default store;
