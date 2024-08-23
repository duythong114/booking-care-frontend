import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getAllBookingsService,
    deleteBookingService,
    getDetailBookingService,
} from '../../services/bookingServices'

export const getAllBookings = createAsyncThunk(
    'booking/getAllBookings',
    async (pagination, { rejectWithValue }) => {
        try {
            const response = await getAllBookingsService(pagination);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBooking = createAsyncThunk(
    'booking/deleteBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            const response = await deleteBookingService(bookingId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getDetailBooking = createAsyncThunk(
    'booking/getDetailBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            const response = await getDetailBookingService(bookingId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Load state from localStorage
const loadDetailBookingJSON = localStorage.getItem('detailBooking');
const loadDetailBooking = JSON.parse(loadDetailBookingJSON)

const initialState = {
    // common state
    isBookingError: null,

    // get all bookings
    isGettingAllBookings: false,
    bookingList: null,
    totalPage: 0,

    // delete booking
    isDeletingBooking: false,

    // get detail booking
    isGettingDetailBooking: false,
    detailBooking: loadDetailBooking ? loadDetailBooking : null,
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // get all bookings
        builder
            .addCase(getAllBookings.pending, (state, action) => {
                state.isGettingAllBookings = true
                state.isBookingError = null
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.isGettingAllBookings = false
                state.bookingList = action.payload?.data?.result
                state.totalPage = action.payload?.data?.meta?.pages
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.isGettingAllBookings = false
                state.isBookingError = action.error.message
            })

        // delete booking
        builder
            .addCase(deleteBooking.pending, (state, action) => {
                state.isDeletingBooking = true
                state.isBookingError = null
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.isDeletingBooking = false
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isDeletingBooking = false
                state.isBookingError = action.error.message
            })

        // get detail booking
        builder
            .addCase(getDetailBooking.pending, (state, action) => {
                state.isGettingDetailBooking = true
                state.isBookingError = null
            })
            .addCase(getDetailBooking.fulfilled, (state, action) => {
                state.isGettingDetailBooking = false
                state.detailBooking = action.payload?.data
                localStorage.setItem('detailBooking', JSON.stringify(action.payload?.data));
            })
            .addCase(getDetailBooking.rejected, (state, action) => {
                state.isGettingDetailBooking = false
                state.isBookingError = action.error.message
            })
    },
})

export default bookingSlice.reducer