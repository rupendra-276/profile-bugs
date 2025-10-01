// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api"; // Update to your backend URL

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/auth/register`,
//         userData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: "Registration failed" }
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         email,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: "Login failed" }
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Register cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "Registration failed";
//       })
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "Login failed";
//       });
//   },
// });

// export default authSlice.reducer;

// ----------------------------
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/auth/register`,
//         userData
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: "Registration failed" }
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         email,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: "Login failed" }
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.error = null;
//       localStorage.removeItem("token"); // Clear token from localStorage
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "Registration failed";
//       })
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "Login failed";
//       });
//   },
// });

// export const { logoutUser } = authSlice.actions;
// export default authSlice.reducer;

// jjjjjjjjjjjjjjjjjjjjjjjjjj



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// // const API_BASE_URL = "http://localhost:5000/api";
// // Environment variable use karte hue API URL
// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL ||
//   "https://jobportalambi.onrender.com/api";

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/auth/register`,
//         userData
//       );
//       toast.success("Registration successful! Please log in.", {
//         position: "top-right",
//       });
//       return response.data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Registration failed";
//       toast.error(message, { position: "top-right" });
//       return rejectWithValue({ message });
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         email,
//         password,
//       });
//       toast.success("Login successful!", { position: "top-right" });
//       return response.data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Login failed";
//       toast.error(message, { position: "top-right" });
//       return rejectWithValue({ message });
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.error = null;
//       localStorage.removeItem("token");
//       toast.success("Logged out successfully!", { position: "top-right" });
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export const { logoutUser } = authSlice.actions;
// export default authSlice.reducer;




// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://jobportalambi.onrender.com/api";

// registerUser & loginUser same as before (keep your existing thunks)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      toast.success("Registration successful! Please log in.", { position: "top-right" });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message, { position: "top-right" });
      return rejectWithValue({ message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      toast.success("Login successful!", { position: "top-right" });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message, { position: "top-right" });
      return rejectWithValue({ message });
    }
  }
);

// **Default user = Rupendra** (for dev/testing). Remove or set to null for production.
const defaultUser = {
  _id: "dev-rupendra-id",
  name: "Rupendra",
  email: "rupendra@example.com",
  role: "user",
  // add other fields you expect in user object
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: typeof window !== "undefined" && localStorage.getItem("token") ? JSON.parse(localStorage.getItem("user") || JSON.stringify(defaultUser)) : defaultUser,
    // user:null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully!", { position: "top-right" });
    },
    // optional: a reducer to set user (e.g., after login)
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (e) {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || state.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        try {
          if (action.payload.token) localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } catch (e) {}
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
