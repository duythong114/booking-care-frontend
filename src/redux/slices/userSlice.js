import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    registerPatientService,
    registerDoctorService,
    loginUserService,
    getUserInfoService,
    getAllUserService,
    deleteUserService,
    getDetailUserService,
    editUserService,
    uploadAvatarService,
} from '../../services/userServices'

export const registerPatient = createAsyncThunk(
    'user/registerPatient',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerPatientService(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerDoctor = createAsyncThunk(
    'user/registerDoctor',
    async (doctorData, { rejectWithValue }) => {
        try {
            const response = await registerDoctorService(doctorData);
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
    async (userPayload, { rejectWithValue }) => {
        try {
            const response = await getAllUserService(userPayload);
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

export const editUser = createAsyncThunk(
    'user/editUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await editUserService(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const uploadAvatar = createAsyncThunk(
    'user/uploadAvatar',
    async (image, { rejectWithValue }) => {
        try {
            const response = await uploadAvatarService(image);
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

    // register patient
    isRegistingPatient: false,

    // register doctor
    isRegistingDoctor: false,

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

    // edit user
    isEditingUser: false,

    // upload avatar
    isUploadingAvatar: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.clear();
            Object.assign(state, initialState, {
                token: null,
                isAuthenticated: false,
                detailUser: null,
            });
        }
    },
    extraReducers: (builder) => {
        // register patient
        builder
            .addCase(registerPatient.pending, (state, action) => {
                state.isRegistingPatient = true
                state.isUserError = null
            })
            .addCase(registerPatient.fulfilled, (state, action) => {
                state.isRegistingPatient = false
            })
            .addCase(registerPatient.rejected, (state, action) => {
                state.isRegistingPatient = false
                state.isUserError = action.error.message
            })

        // register doctor
        builder
            .addCase(registerDoctor.pending, (state, action) => {
                state.isRegistingDoctor = true
                state.isUserError = null
            })
            .addCase(registerDoctor.fulfilled, (state, action) => {
                state.isRegistingDoctor = false
            })
            .addCase(registerDoctor.rejected, (state, action) => {
                state.isRegistingDoctor = false
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

        // edit user
        builder
            .addCase(editUser.pending, (state, action) => {
                state.isEditingUser = true
                state.isUserError = null
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isEditingUser = false
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isEditingUser = false
                state.isUserError = action.error.message
            })

        // upload avatar
        builder
            .addCase(uploadAvatar.pending, (state, action) => {
                state.isUploadingAvatar = true
                state.isUserError = null
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.isUploadingAvatar = false
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.isUploadingAvatar = false
                state.isUserError = action.error.message
            })
    },
})

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer