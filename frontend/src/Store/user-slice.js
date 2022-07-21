import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  data: {
    id: "",
    name: "",
    email: "",
    photo: "",
    role: ""
  },
  actualPhoto:''
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload;

      state.isLoggedIn = true;
      state.data.id = user._id;
      state.data.role = user.role;
      state.data.name = user.name;
      state.data.email = user.email;
      state.data.photo = user.photo;
      // console.log(state.data);
    },
    resetUser(state) {
      state.isLoggedIn = false;
      state.actualPhoto= "";
      state.data.id = "";
      state.data.role = "";
      state.data.name = "";
      state.data.email = "";
      state.data.photo = "";
    },
    updatePhoto(state, action){
      state.actualPhoto = action.payload;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;