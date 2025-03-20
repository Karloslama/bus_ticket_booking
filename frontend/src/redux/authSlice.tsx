import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  users: User[];
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  users: [],
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
    console.log(response.data);
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async (userId: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/users/${userId}`
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, userData }: { userId: string; userData: Partial<User> }) => {
    const response = await axios.put(
      `http://localhost:5000/api/users/${userId}`,
      userData
    );
    return response.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/users/${userId}"
    );
    return response.data;
  }
);

// export const blockUser = createAsyncThunk(
//   "auth/blockUser",
//   async (userId: string) => {
//     const response = await axios.put(`/api/users/${userId}/block`);
//     return response.data;
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login Failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration Failed";
      })
      // Fetch user by ID
      .addCase(fetchUserById.fulfilled, (state, action) => {
        if (state.user?.id === action.payload.id) {
          state.user = action.payload;
        }
      })
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.user?.id === action.payload.id) {
          state.user = action.payload;
        }
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Fetch all users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // Block user
      // .addCase(blockUser.fulfilled, (state, action) => {
      //   const index = state.users.findIndex(
      //     (user) => user.id === action.payload.id
      //   );
      //   if (index !== -1) {
      //     state.users[index] = action.payload;
      //   }
      // });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
