import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUserService } from '../../services/userServices'

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginUserService(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Load state from localStorage
const tokenFromLocalStorage = localStorage.getItem('token');

const initialState = {
    // common state
    isUserError: null,

    // login user
    isLogging: false,
    token: tokenFromLocalStorage,
    isAuthenticated: tokenFromLocalStorage ? true : false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        // login user
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.isLogging = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLogging = false
                state.isAuthenticated = true
                state.token = action.payload?.data
                localStorage.setItem('token', action.payload?.data);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLogging = false
                state.isUserError = action.error.message
            })
    },
})

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer