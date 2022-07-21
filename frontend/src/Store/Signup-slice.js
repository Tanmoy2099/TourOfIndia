import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Name: {
    value: '',
    isValid: false,
  },
  Email: {
    value: '',
    isValid: false,
  },
  Password: {
    value: '',
    isValid: false,
  },
  ConfirmPassword: {
    value: '',
    isValid: false
  },
//   AgreeTerm:{
// value
//   }
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    
    name({ Name }, action) {

      const value = action.payload;
      Name.value = value;
      Name.isValid = value.length > 0;

    },

    email({ Email }, action) {
      const regexTest = new RegExp(/^[\w.! #$%&'*+/=? ^_`{|}~-]+@[\w].*[\w{2,3}]+$/);

        const value = action.payload;
        Email.value = value.trim();
        Email.isValid = regexTest.test(value);
      
    },

    password({ Password }, action) {
        const value = action.payload;
        Password.value = value.trim();
        Password.isValid = value.length > 7;
    },

    confirmPassword({ ConfirmPassword, Password }, action) {
        const value = action.payload;
        ConfirmPassword.value = value.trim();
        ConfirmPassword.isValid = ConfirmPassword.value === Password.value;
    },

    reset(state) {
      state = initialState;
    }
  }
});

export const signupActions = signupSlice.actions;

export default signupSlice.reducer;
