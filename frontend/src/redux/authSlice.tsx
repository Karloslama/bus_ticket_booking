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
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }) => {
      const response = await axios.post('/api/auth/login', credentials);
      return response.data;
    }
  );

  export const register = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; email: string; password: string }) => {
      const response = await axios.post('/api/auth/register', userData);
      return response.data;
    }
  );

const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) =>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state)=>{
            state.loading=true;
            state.error= null;
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.loading= false;
            state.user= action.payload.user;
            state.token= action.payload.token;
            localStorage.setItem('token', action.payload.token)
        })
        .addCase(login.rejected, (state, action)=>{
            state.loading= false;
            state.error= action.error.message || "Login Failed"
        })
        .addCase(register.pending, (state)=>{
            state.loading= false;
            state.error= null;
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.loading= false;
            state.user= action.payload.user;
            state.token= action.payload.token;
            localStorage.setItem('token', action.payload.token)
        })
        .addCase(register.rejected, (state, action)=>{
            state.loading= false;
            state.error= action.error.message || "Registration Failed"
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;