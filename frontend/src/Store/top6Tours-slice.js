import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  top6: []
};

const top6ToursSlice = createSlice({
  name: "top6",
  initialState,
  reducers: {
    updateTopTours(state, action) {
      state.top6 = action.payload
    }
  }
});


export const top6StateActions = top6ToursSlice.actions;

export default top6ToursSlice.reducer;