import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    name: null,
    email: null,
    accessToken: null,
    refreshToken: null, // Thêm refreshToken
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      const { id, name, email, accessToken, refreshToken } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken; // Lưu refreshToken
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.accessToken = null;
      state.refreshToken = null; // Xóa refreshToken
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
