import { createSlice } from '@reduxjs/toolkit';

const privPageSlice = createSlice({
    name: 'privPage',
    initialState: [
        { uri: "https://picsum.photos/700", title: "page of something", content: "Lorem ipsum long text thingy jiggy" },
        { uri: "https://picsum.photos/700", title: "Software Development", content: "Lorem ipsum but its not long text thingy jiggy" },
    ],
    reducers: {
        addPrivatePage: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addPrivatePage } = privPageSlice.actions;
export default privPageSlice.reducer;
