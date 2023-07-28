// store.js

import { configureStore } from '@reduxjs/toolkit';
import privPageReducer from './privPageSlice';

const store = configureStore({
  reducer: {
    privPage: privPageReducer,
  },
});

export default store;
