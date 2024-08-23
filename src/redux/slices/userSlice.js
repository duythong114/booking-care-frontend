import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    registerUserService,
    loginUserService,
    getUserInfoService,
    getAllUserService,
    deleteUserService,
    getDetailUserService,
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

export const getAllUser = createAsyncThunk(
    'user/getAllUser',
    async (pagination, { rejectWithValue }) => {
        try {
            const response = await getAllUserService(pagination);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await deleteUserService(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getDetailUser = createAsyncThunk(
    'user/getDetailUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getDetailUserService(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Load state from localStorage
const loadToken = localStorage.getItem('token');
const loadUserInfoJSON = localStorage.getItem('userInfo');
const loadUserInfo = JSON.parse(loadUserInfoJSON)
const loadDetailUserJSON = localStorage.getItem('detailUser');
const loadDetailUser = JSON.parse(loadDetailUserJSON)

const initialState = {
    // common state
    isUserError: null,

    // register user
    isRegisting: false,

    // login user
    isLogging: false,
    token: loadToken ? loadToken : null,
    isAuthenticated: loadToken ? true : false,

    // get user info
    isGettingUserInfo: false,
    userInfo: loadUserInfo ? loadUserInfo : null,

    // get all users
    isGettingAllUsers: false,
    userList: null,
    totalPage: 0,

    // delete user
    isDeletingUser: false,

    // get detail user
    isGettingDetailUser: false,
    detailUser: loadDetailUser,

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.clear();
            Object.assign(state, initialState)
        }
    },
    extraReducers: (builder) => {
        // register user
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isRegisting = true
                state.isUserError = null
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
                state.isUserError = null
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
                state.isUserError = null
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

        // get all users
        builder
            .addCase(getAllUser.pending, (state, action) => {
                state.isGettingAllUsers = true
                state.isUserError = null
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isGettingAllUsers = false
                state.userList = action.payload?.data?.result
                state.totalPage = action.payload?.data?.meta?.pages
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isGettingAllUsers = false
                state.isUserError = action.error.message
            })

        // delete user
        builder
            .addCase(deleteUser.pending, (state, action) => {
                state.isDeletingUser = true
                state.isUserError = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isDeletingUser = false
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isDeletingUser = false
                state.isUserError = action.error.message
            })

        // get detail user
        builder
            .addCase(getDetailUser.pending, (state, action) => {
                state.isGettingDetailUser = true
                state.isUserError = null
            })
            .addCase(getDetailUser.fulfilled, (state, action) => {
                state.isGettingDetailUser = false
                state.detailUser = action.payload?.data
                localStorage.setItem('detailUser', JSON.stringify(action.payload?.data));
            })
            .addCase(getDetailUser.rejected, (state, action) => {
                state.isGettingDetailUser = false
                state.isUserError = action.error.message
            })
    },
})

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer