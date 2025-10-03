// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { users as initialUsers } from "../constents/constents";
import { saveState, loadState } from "../utils/localStorage";
import { updateSectionHelper } from "../utils/sectionUpdater";

// load persisted
const persistedState = loadState();

// determine default current user (persisted takes precedence if present)
const defaultCurrent =
  (persistedState && persistedState.currentUser) ||
  initialUsers.find((u) => u.id === "u12345") ||
  initialUsers[0] ||
  null;

const initialState = {
  users: (persistedState && persistedState.users) || initialUsers,
  currentUser: defaultCurrent,
  notifications: (persistedState && persistedState.notifications) || [],
  collabs: (persistedState && persistedState.collabs) || [],
};

const ensureArrays = (u) => ({
  ...u,
  followers: Array.isArray(u.followers) ? u.followers : [],
  following: Array.isArray(u.following) ? u.following : [],
  connections: Array.isArray(u.connections) ? u.connections : [],
  followersCount: typeof u.followersCount === "number" ? u.followersCount : (u.followers ? u.followers.length : 0),
  followingCount: typeof u.followingCount === "number" ? u.followingCount : (u.following ? u.following.length : 0),
  connectionsCount: typeof u.connectionsCount === "number" ? u.connectionsCount : (u.connections ? u.connections.length : 0),
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.map(ensureArrays);
      saveState(state);
    },
    setCurrentUser(state, action) {
      state.currentUser = ensureArrays(action.payload);
      saveState(state);
    },

    // update current user fields (partial)
    updateUser(state, action) {
      if (!state.currentUser) return;
      const updated = { ...state.currentUser, ...action.payload };
      state.currentUser = ensureArrays(updated);
      state.users = state.users.map((u) => (u.id === updated.id ? ensureArrays(updated) : u));
      saveState(state);
    },

    // update any user by id (partial)
    updateUserById(state, action) {
      const { id, updates } = action.payload;
      state.users = state.users.map((u) => {
        if (u.id !== id) return u;
        const merged = ensureArrays({ ...u, ...updates });
        // adjust counts if arrays changed
        merged.followersCount = merged.followers.length;
        merged.followingCount = merged.following.length;
        merged.connectionsCount = merged.connections.length;
        return merged;
      });
      if (state.currentUser?.id === id) {
        const found = state.users.find((u) => u.id === id);
        state.currentUser = found ? ensureArrays(found) : state.currentUser;
      }
      saveState(state);
    },

    // follow user
    followUser(state, action) {
      const { targetId, currentUserId } = action.payload;
      if (!targetId || !currentUserId) return;

      // find user objects
      const target = state.users.find((u) => u.id === targetId);
      const current = state.users.find((u) => u.id === currentUserId) || state.currentUser;

      if (!target || !current) return;

      // defensive init
      target.followers = Array.isArray(target.followers) ? target.followers : [];
      current.following = Array.isArray(current.following) ? current.following : [];

      // if already following, do nothing
      if (target.followers.includes(currentUserId)) return;

      // add
      target.followers = [...target.followers, currentUserId];
      target.followersCount = target.followers.length;

      current.following = [...current.following, targetId];
      current.followingCount = current.following.length;

      // persist updated users collection
      state.users = state.users.map((u) => {
        if (u.id === targetId) return ensureArrays({ ...u, followers: target.followers, followersCount: target.followersCount });
        if (u.id === currentUserId) return ensureArrays({ ...u, following: current.following, followingCount: current.followingCount });
        return u;
      });

      // update state.currentUser if relevant
      if (state.currentUser?.id === currentUserId) {
        state.currentUser = ensureArrays({ ...state.currentUser, following: current.following, followingCount: current.followingCount });
      }

      // add notification
      state.notifications.unshift({
        id: Date.now(),
        type: "follow",
        from: currentUserId,
        to: targetId,
        message: "started following you.",
        read: false,
        createdAt: new Date().toISOString(),
      });

      saveState(state);
    },

    // unfollow user
    unfollowUser(state, action) {
      const { targetId, currentUserId } = action.payload;
      if (!targetId || !currentUserId) return;

      const target = state.users.find((u) => u.id === targetId);
      const current = state.users.find((u) => u.id === currentUserId) || state.currentUser;
      if (!target || !current) return;

      target.followers = Array.isArray(target.followers) ? target.followers : [];
      current.following = Array.isArray(current.following) ? current.following : [];

      // if not following, nothing to do
      if (!target.followers.includes(currentUserId)) return;

      target.followers = target.followers.filter((id) => id !== currentUserId);
      target.followersCount = Math.max(0, target.followers.length);

      current.following = current.following.filter((id) => id !== targetId);
      current.followingCount = Math.max(0, current.following.length);

      state.users = state.users.map((u) => {
        if (u.id === targetId) return ensureArrays({ ...u, followers: target.followers, followersCount: target.followersCount });
        if (u.id === currentUserId) return ensureArrays({ ...u, following: current.following, followingCount: current.followingCount });
        return u;
      });

      if (state.currentUser?.id === currentUserId) {
        state.currentUser = ensureArrays({ ...state.currentUser, following: current.following, followingCount: current.followingCount });
      }

      saveState(state);
    },

  // --- SEND COLLAB REQUEST
    sendCollabRequest(state, action) {
      const { targetId, currentUserId } = action.payload;
      if (!targetId || !currentUserId) return;
      if (targetId === currentUserId) return;

      // don't send if already connected
      const fromUser = state.users.find((u) => u.id === currentUserId);
      if (fromUser && fromUser.connections?.includes(targetId)) return;

      // check existing pending or accepted collab between them
      const existing = state.collabs.find(
        (c) =>
          ((c.from === currentUserId && c.to === targetId) ||
            (c.from === targetId && c.to === currentUserId)) &&
          (c.status === "pending" || c.status === "accepted")
      );
      if (existing) return; // avoid duplicate
      const id = Date.now();
     const collabObj = {
        id,
        type: "collab-request",
        from: currentUserId,
        to: targetId,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      state.collabs.unshift(collabObj);

      // create notification
      state.notifications.unshift({
        id,
        type: "collab-request",
        from: currentUserId,
        to: targetId,
        message: "wants to collaborate with you.",
        status: "pending",
        read: false,
        createdAt: collabObj.createdAt,
      });

   
      saveState(state);
    },

    // --- ACCEPT COLLAB (notificationId = collabId)
    acceptCollab(state, { payload: { notificationId, currentUserId } }) {
      const collab = state.collabs.find((c) => c.id === notificationId);
      if (!collab || collab.to !== currentUserId || collab.status !== "pending") return;

      collab.status = "accepted";

      // add connections
      const fromId = collab.from;
      const toId = collab.to;
      state.users.forEach((u) => {
        if (u.id === fromId || u.id === toId) {
          u.connections = Array.from(new Set([...u.connections, fromId === u.id ? toId : fromId]));
          u.connectionsCount = u.connections.length;
        }
      });

      // notification to sender
      state.notifications.unshift({
        id: Date.now(),
        type: "collab-accepted",
        from: currentUserId,
        to: fromId,
        message: "accepted your collab request.",
        read: false,
        createdAt: new Date().toISOString(),
      });

      saveState(state);
    },
// rejected
   rejectCollab(state, action) {
      const { notificationId, currentUserId } = action.payload;
      if (!notificationId || !currentUserId) return;

      const collab = state.collabs.find((c) => c.id === notificationId);
      if (!collab) return;
      if (collab.to !== currentUserId) return; // only receiver can reject
      if (collab.status !== "pending") return;

      collab.status = "rejected";

      // update notification too
      const notif = state.notifications.find((n) => n.id === notificationId);
      if (notif) notif.status = "rejected";

      // optional: notify sender that request was rejected
      state.notifications.unshift({
        id: Date.now(),
        type: "collab-rejected",
        from: currentUserId,
        to: collab.from,
        message: "rejected your collab request.",
        read: false,
        createdAt: new Date().toISOString(),
      });

      saveState(state);
    },

// user 
     updateSection(state, action) {
      const newState = updateSectionHelper(state, action.payload);
      saveState(newState);
      return newState;
    },

    // mark all notifications read
    markNotificationsRead(state) {
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
      saveState(state);
    },
    clearAllNotifications(state) {
  state.notifications = [];
  saveState(state);
},

addCertification(state, { payload }) {
  if (!state.currentUser) return;
  const updated = {
    ...state.currentUser,
    certifications: [...(state.currentUser.certifications || []), payload],
  };
  state.currentUser = updated;
  state.users = state.users.map(u => u.id === updated.id ? updated : u);
  saveState(state);
},

updateCertification(state, { payload: { index, data } }) {
  if (!state.currentUser) return;
  const updatedCerts = [...(state.currentUser.certifications || [])];
  updatedCerts[index] = { ...updatedCerts[index], ...data };

  state.currentUser = { ...state.currentUser, certifications: updatedCerts };
  state.users = state.users.map(u => u.id === state.currentUser.id ? state.currentUser : u);
  saveState(state);
},

deleteCertification(state, { payload: index }) {
  if (!state.currentUser) return;
  const updatedCerts = (state.currentUser.certifications || []).filter((_, i) => i !== index);

  state.currentUser = { ...state.currentUser, certifications: updatedCerts };
  state.users = state.users.map(u => u.id === state.currentUser.id ? state.currentUser : u);
  saveState(state);
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
  sendCollabRequest,
  acceptCollab,
  rejectCollab,
  markNotificationsRead,
  clearAllNotifications,
  addCertification,
  updateCertification,
  deleteCertification,
  updateSection ,

} = userSlice.actions;

export default userSlice.reducer;
