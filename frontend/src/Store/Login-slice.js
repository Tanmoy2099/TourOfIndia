import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Email: {
        value: '',
        isValid: false,
    },
    Password: {
        value: '',
        isValid: false,
    }
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

        email({ Email }, action) {
            const regexTest = new RegExp(/^[\w.! #$%&'*+/=? ^_`{|}~-]+@[\w].*[\w{2,3}]+$/);

            const value = action.payload;
            Email.value = value.trim();
            Email.isValid = regexTest.test(value);

            // console.log(Email.value);
        },

        password({ Password }, action) {
            const value = action.payload;
            Password.value = value.trim();
            Password.isValid = value.length > 7;
        },

        reset(state) {
            state = initialState;
        }
    }
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
