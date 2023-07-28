// privPageSlice.js

import { createSlice } from '@reduxjs/toolkit';

const privPageSlice = createSlice({
  name: 'privPage',
  initialState: [], // Initial state for privPage
  reducers: {
    addPage: (state, action) => {
      // The action.payload should be an object with uri and title properties
      state.push(action.payload);
    },
  },
});

export const { addPage } = privPageSlice.actions;
export default privPageSlice.reducer;
