import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export type AuthState = typeof initialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const authReducer = authSlice.reducer;
