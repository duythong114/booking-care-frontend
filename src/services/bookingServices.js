import axios from "../axiosConfig";

const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(error.response.data.message || 'An error occurred.');
    } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from the server.');
    } else {
        // Something else happened
        throw new Error('An unexpected error occurred.');
    }
};

const getAllBookingsService = async (pagination) => {
    try {
        const response = await axios.get(`/api/appointments?page=${pagination.page}&size=${pagination.size}&sort=id,${pagination.sortOrder}`);
        return response;
    } catch (error) {
        handleError(error)
    }
};

const deleteBookingService = async (bookingId) => {
    try {
        const response = await axios.delete(`/api/appointments/${bookingId}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

const getDetailBookingService = async (bookingId) => {
    try {
        const response = await axios.get(`/api/appointments/${bookingId}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

const getAvailableBookingService = async () => {
    try {
        const response = await axios.get('api/appointments/appointment-available');
        return response;
    } catch (error) {
        handleError(error)
    }
}

const createBookingService = async (bookingData) => {
    try {
        const response = await axios.post('api/appointments', {
            appointmentDate: bookingData.appointmentDate,
            appointmentTime: bookingData.appointmentTime,
            patientId: bookingData.patientId
        });
        return response;
    } catch (error) {
        handleError(error)
    }
}

const getMedicalHistoryService = async (pagination) => {
    try {
        const response = await axios.get(`/api/appointments/patient?page=${pagination.page}&size=${pagination.size}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

const updateBookingService = async (bookingData) => {
    try {
        const response = await axios.put(`/api/appointments/${bookingData.bookingId}`, {
            appointmentTime: bookingData.appointmentTime,
            appointmentDate: bookingData.appointmentDate,
            appointmentStatus: bookingData.appointmentStatus,
            diagnosis: bookingData.diagnosis,
            treatment: bookingData.treatment
        });
        return response;
    } catch (error) {
        handleError(error)
    }
}

const searchBookingService = async (searchPayload) => {
    try {
        const response = await axios.get(`/api/appointments?page=${searchPayload.page}&size=${searchPayload.size}&patientName=${searchPayload.searchData}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

const getBookingByDateService = async (filterPayload) => {
    try {
        const response = await axios.get(`/api/appointments?page=${filterPayload.page}&size=${filterPayload.size}&date=${filterPayload.date}`);
        return response;
    } catch (error) {
        handleError(error)
<<<<<<< HEAD
    }
}

const searchBookingService = async ( pagination) => {
    try {
        const response = await axios.get(`/api/appointments?page=${pagination.page}&size=${pagination.size}&patientName=${pagination.searchData}`);
        return response;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(error.response.data.message || 'An error occurred during login.');
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('No response from the server.');
        } else {
            // Something else happened
            throw new Error('An unexpected error occurred.');
        }
    }
}

const getBookingByDate = async ( pagination) => {
    try {
        const response = await axios.get(`/api/appointments?page=${pagination.page}&size=${pagination.size}&date=${pagination.date}`);
        return response;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(error.response.data.message || 'An error occurred during login.');
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('No response from the server.');
        } else {
            // Something else happened
            throw new Error('An unexpected error occurred.');
        }
    }
}

const getBookingByTime = async (pagination) => {
    try {
        const response = await axios.get(`/api/appointments?page=${pagination.page}&size=${pagination.size}&time=${pagination.time}`);
        return response;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(error.response.data.message || 'An error occurred during login.');
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('No response from the server.');
        } else {
            // Something else happened
            throw new Error('An unexpected error occurred.');
        }
=======
>>>>>>> main
    }
}

export {
    getAllBookingsService,
    deleteBookingService,
    getDetailBookingService,
    getAvailableBookingService,
    createBookingService,
<<<<<<< HEAD
<<<<<<< HEAD
    searchBookingService,
    getBookingByDate,
    getBookingByTime,
=======
=======
>>>>>>> main
    getMedicalHistoryService,
    updateBookingService,
    searchBookingService,
    getBookingByDateService,
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
}