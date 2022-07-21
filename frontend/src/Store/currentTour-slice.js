import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stateId: '',
    tours: [],
    curState: [],
    curTour: [],
    reviews:[]
}

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        updateTours(state, action) {
            state.tours = action.payload;
        },
        selectedStateId(state, action) {
            state.stateId = action.payload;
        },
        setCurState(state, action){
            state.curState = action.payload
        },
        setCurTour(state, action){
            state.curTour = action.payload
        },
        setReview(state, action){
            state.reviews = action.payload
        }
    }
});

export const tourActions = tourSlice.actions;

export default tourSlice.reducer;
