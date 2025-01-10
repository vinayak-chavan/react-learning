import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    role: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        clearUser(state) {
            state.token = null;
            state.role = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
