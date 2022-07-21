import { configureStore } from '@reduxjs/toolkit';

import signupReducer from './Signup-slice';
import loginReducer from './Login-slice';
import stateReducer from './state-slice';
import userReducer from './user-slice';
import currentTourReducer from "./currentTour-slice";
import top6ToursReducer from "./top6Tours-slice";
import allTourReducer from './AllTour-slice';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    states: stateReducer,
    login: loginReducer,
    user: userReducer,
    tour: currentTourReducer,
    top6Tours: top6ToursReducer,
    alltour: allTourReducer,
  }
})

export default store;
