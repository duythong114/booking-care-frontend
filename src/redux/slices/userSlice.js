import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { testApi } from '../../services/userServices'

export const FetchAllStudents = createAsyncThunk(
    'user/fetchAllStudents',
    async () => {
        const response = await testApi()
        return response
    },
)

const initialState = {
    // common state
    isUserError: null,

    // fetch all students
    isLoadingAllStudent: false,
    listStudents: null,

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // fetch all user
        builder
            .addCase(FetchAllStudents.pending, (state, action) => {
                state.isLoadingAllStudent = true
            })
            .addCase(FetchAllStudents.fulfilled, (state, action) => {
                state.isLoadingAllStudent = false
                state.listStudents = action.payload
            })
            .addCase(FetchAllStudents.rejected, (state, action) => {
                state.isLoadingAllStudent = false
                state.isUserError = action.error.message
            })
    },
})

export default userSlice.reducer