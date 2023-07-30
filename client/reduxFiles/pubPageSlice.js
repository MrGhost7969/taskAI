import { createSlice } from '@reduxjs/toolkit';

const pubPageSlice = createSlice({
  name: 'pubPage',
  initialState: [
    { uri: 'https://picsum.photos/700', title: "titled untitled" },
    { uri: 'https://picsum.photos/700', title: "Hello World" }
  ],
  reducers: {
    addPublicPage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPublicPage } = pubPageSlice.actions;
export default pubPageSlice.reducer;