import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  states: []
}


const stateSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    updateState(state, action) {
      state.total = action.payload.result
      state.states = action.payload.data
    }
  }
})

export const stateActions = stateSlice.actions;

export default stateSlice.reducer;

