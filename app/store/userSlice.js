// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { users } from "../constents/constents";
const initialState = {
  users: users,         // सारे users list
  currentUser: null, // login हुआ user
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      if (state.currentUser?.id === action.payload) {
        state.currentUser = null;
      }
    },
  },
});

export const { setUsers, setCurrentUser, updateUser, addUser, removeUser } =
  userSlice.actions;
export default userSlice.reducer;
