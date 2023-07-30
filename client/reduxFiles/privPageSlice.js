import { createSlice } from '@reduxjs/toolkit';

const privPageSlice = createSlice({
  name: 'privPage',
  initialState: [
    { uri: "https://picsum.photos/700", title: "page of something" },
    { uri: "https://picsum.photos/700", title: "Software Development" },
  ],
  reducers: {
    addPrivatePage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPrivatePage } = privPageSlice.actions;
export default privPageSlice.reducer;
