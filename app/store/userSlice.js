

// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { users as initialUsers } from "../constents/constents";

const defaultCurrent = initialUsers.find((u) => u.username === "rupendra") || initialUsers[0] || null;

const initialState = {
  users: initialUsers,
  // default logged in user (rupendra)
  currentUser: defaultCurrent,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    // payload: partial user fields to merge into currentUser
    // updateUser(state, action) {
    //   if (!state.currentUser) return;
    //   const updated = { ...state.currentUser, ...action.payload };
    //   state.currentUser = updated;
    //   state.users = state.users.map((u) => (u.id === updated.id ? updated : u));
    // },

    updateUser: (state, action) => {
      // ✅ Merge updates instead of replacing whole user
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    // payload: { id, data }
    updateUserById(state, action) {
      const { id, data } = action.payload;
      state.users = state.users.map((u) => (u.id === id ? { ...u, ...data } : u));
      if (state.currentUser?.id === id) state.currentUser = { ...state.currentUser, ...data };
    },
    // payload: { targetId, currentUserId }
    followUser(state, action) {
      const { targetId, currentUserId } = action.payload;
      // increment followers count of target user
      state.users = state.users.map((u) =>
        u.id === targetId ? { ...u, followers: (u.followers || 0) + 1 } : u
      );
      // add to currentUser.following
      if (state.currentUser && state.currentUser.id === currentUserId) {
        const following = new Set(state.currentUser.following || []);
        following.add(targetId);
        state.currentUser = { ...state.currentUser, following: Array.from(following) };
      }
      // also reflect on the users array the following array of currentUser
      state.users = state.users.map((u) =>
        u.id === currentUserId ? { ...u, following: state.currentUser?.following || [] } : u
      );
    },
    // payload: { targetId, currentUserId }
    unfollowUser(state, action) {
      const { targetId, currentUserId } = action.payload;
      state.users = state.users.map((u) =>
        u.id === targetId ? { ...u, followers: Math.max(0, (u.followers || 1) - 1) } : u
      );
      if (state.currentUser && state.currentUser.id === currentUserId) {
        const following = new Set(state.currentUser.following || []);
        following.delete(targetId);
        state.currentUser = { ...state.currentUser, following: Array.from(following) };
      }
      state.users = state.users.map((u) =>
        u.id === currentUserId ? { ...u, following: state.currentUser?.following || [] } : u
      );
    },
  },
});

export const {
  setUsers,
  setCurrentUser,
  updateUser,
  updateUserById,
  followUser,
  unfollowUser,
} = userSlice.actions;

export default userSlice.reducer;

