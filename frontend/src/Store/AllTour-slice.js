import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTours: [],
}
const allTourSlice = createSlice({
    name: 'alltour',
    initialState,
    reducers: {
        AllToursUpdate(state, action) {
            state.allTours = action.payload;
        }
    }
});

export const allTourActions = allTourSlice.actions;
export default allTourSlice.reducer;
