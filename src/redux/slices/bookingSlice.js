import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getAllBookingsService,
    deleteBookingService,
    getDetailBookingService,
    getAvailableBookingService,
    createBookingService,
    getMedicalHistoryService,
    updateBookingService,
} from '../../services/bookingServices'

export const getAllBookings = createAsyncThunk(
    'booking/getAllBookings',
    async (bookingPayload, { rejectWithValue }) => {
        try {
            const response = await getAllBookingsService(bookingPayload);
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

export const getAvailableBooking = createAsyncThunk(
    'booking/getAvailableBooking',
    async () => {
        try {
            const response = await getAvailableBookingService();
            return response;
        } catch (error) {
            return error.message;
        }
    }
);

export const createBooking = createAsyncThunk(
    'booking/createBooking',
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await createBookingService(bookingData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getMedicalHistory = createAsyncThunk(
    'booking/getMedicalHistory',
    async (pagination, { rejectWithValue }) => {
        try {
            const response = await getMedicalHistoryService(pagination);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBooking = createAsyncThunk(
    'booking/updateBooking',
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await updateBookingService(bookingData);
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

    // get available booking
    isGettingAvailable: false,
    availableBookingList: null,

    // create booking
    isCreatingBooking: false,

    // get medical history
    isGettingMedicalHistory: false,
    historyList: null,
    totalHistoryPages: 0,

    // update booking
    isUpdatingBooking: false,
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

        // get available bookings
        builder
            .addCase(getAvailableBooking.pending, (state, action) => {
                state.isGettingAvailable = true
                state.isBookingError = null
            })
            .addCase(getAvailableBooking.fulfilled, (state, action) => {
                state.isGettingAvailable = false
                state.availableBookingList = action.payload?.data
            })
            .addCase(getAvailableBooking.rejected, (state, action) => {
                state.isGettingAvailable = false
                state.isBookingError = action.error.message
            })

        // create booking
        builder
            .addCase(createBooking.pending, (state, action) => {
                state.isCreatingBooking = true
                state.isBookingError = null
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.isCreatingBooking = false
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isCreatingBooking = false
                state.isBookingError = action.error.message
            })

        // get medical history
        builder
            .addCase(getMedicalHistory.pending, (state, action) => {
                state.isGettingMedicalHistory = true
                state.isBookingError = null
            })
            .addCase(getMedicalHistory.fulfilled, (state, action) => {
                state.isGettingMedicalHistory = false
                state.historyList = action.payload?.data?.result
                state.totalHistoryPages = action.payload?.data?.meta?.pages
            })
            .addCase(getMedicalHistory.rejected, (state, action) => {
                state.isGettingMedicalHistory = false
                state.isBookingError = action.error.message
            })

        // update booking
        builder
            .addCase(updateBooking.pending, (state, action) => {
                state.isUpdatingBooking = true
                state.isBookingError = null
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.isUpdatingBooking = false
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.isUpdatingBooking = false
                state.isBookingError = action.error.message
            })
    },
})

export default bookingSlice.reducer