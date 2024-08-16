import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUserService } from '../../services/userServices'

export const registerNewUser = createAsyncThunk(
    'user/registerNewUser',
    async (userData) => {
        const response = await registerUserService(userData)
        return response
    },
)

const initialState = {
    // common state
    isUserError: null,

    // register new user
    isRegistering: false,

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // register new user
        builder
            .addCase(registerNewUser.pending, (state, action) => {
                state.isRegistering = true
            })
            .addCase(registerNewUser.fulfilled, (state, action) => {
                state.isRegistering = false
            })
            .addCase(registerNewUser.rejected, (state, action) => {
                state.isRegistering = false
                state.isUserError = action.error.message
            })
    },
})

export default userSlice.reducer