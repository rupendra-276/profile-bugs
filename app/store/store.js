// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });


// app/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice.js";
import authReducer from "./authSlice";
import { saveState } from "../utils/localStorage.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
  
});

// Persist on every update
store.subscribe(() => {
  saveState(store.getState().users);
});

