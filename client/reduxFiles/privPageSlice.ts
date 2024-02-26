import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
interface PrivatePageParams {
    uri: string,
    title: string,
    content: string | ReactNode
}

const initialState: PrivatePageParams[] = [
    { uri: "https://picsum.photos/700", title: "page of something", content: "Lorem ipsum long text thingy jiggy" },
    { uri: "https://picsum.photos/700", title: "Software Development", content: "Lorem ipsum but its not long text thingy jiggy" },
];

const privPageSlice = createSlice({
    name: 'privPage',
    initialState,
    reducers: {
        addPrivatePage: (state, action: PayloadAction<PrivatePageParams>) => {
            state.push(action.payload);
        },
    },
});

export const { addPrivatePage } = privPageSlice.actions;
export default privPageSlice.reducer;
