import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as userAPI from "../api/user";

export const login = createAsyncThunk(
  "session/login",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await userAPI.login(userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    connectSocket(state, action) { },
    logout(state, action) {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload.message;
      })
    }
});

export const { connectSocket, logout } = sessionSlice.actions;

export default sessionSlice.reducer;