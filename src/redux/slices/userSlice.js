import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    registerUserService,
    loginUserService,
    getUserInfoService,
} from '../../services/userServices'

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerUserService(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async () => {
        try {
            const response = await getUserInfoService();
            return response;
        } catch (error) {
            return error
        }
    }
);

// Load state from localStorage
const loadToken = localStorage.getItem('token');
const loadUserInfoJSON = localStorage.getItem('userInfo');
const loadUserInfo = JSON.parse(loadUserInfoJSON)

const initialState = {
    // common state
    isUserError: null,

    // register user
    isRegisting: false,

    // login user
    isLogging: false,
    token: loadToken,
    isAuthenticated: loadToken ? true : false,

    // get user info
    isGettingUserInfo: false,
    userInfo: loadUserInfo,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.clear();;
        }
    },
    extraReducers: (builder) => {
        // register user
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isRegisting = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isRegisting = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isRegisting = false
                state.isUserError = action.error.message
            })

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

        // get user info
        builder
            .addCase(getUserInfo.pending, (state, action) => {
                state.isGettingUserInfo = true
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isGettingUserInfo = false
                state.userInfo = action.payload?.data
                localStorage.setItem('userInfo', JSON.stringify(action.payload?.data));
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isGettingUserInfo = false
                state.isUserError = action.error.message
            })
    },
})

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer