import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: null,
        email: null,
        accessToken: null,
        refreshToken: null, // Thêm refreshToken
    },
    reducers: {
        setCredentials: (state, action) => {
            const { name, email, accessToken, refreshToken } = action.payload;
            state.name = name;
            state.email = email;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken; // Lưu refreshToken
        },
        clearCredentials: (state) => {
            state.name = null;
            state.email = null;
            state.accessToken = null;
            state.refreshToken = null; // Xóa refreshToken
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;