import axios from "../axiosConfig";

const getAllBookingsService = async (pagination) => {
    try {
        const response = await axios.get(`/api/appointments?page=${pagination.page}&size=${pagination.size}`);
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
};

const deleteBookingService = async (bookingId) => {
    try {
        const response = await axios.delete(`/api/appointments/${bookingId}`);
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

const getDetailBookingService = async (bookingId) => {
    try {
        const response = await axios.get(`/api/appointments/${bookingId}`);
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

const getAvailableBookingService = async () => {
    try {
        const response = await axios.get('api/appointments/appointment-available');
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

const createBookingService = async (bookingData) => {
    try {
        const response = await axios.post('api/appointments', {
            appointmentDate: bookingData.appointmentDate,
            appointmentTime: bookingData.appointmentTime,
            patientId: bookingData.patientId
        });
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

const getMedicalHistoryService = async (pagination) => {
    try {
        const response = await axios.get(`/api/appointments/patient?page=${pagination.page}&size=${pagination.size}`);
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

const searchBookingService = async (searchPayload) => {
    try {
        const response = await axios.get(`/api/appointments?page=${searchPayload.page}&size=${searchPayload.size}&patientName=${searchPayload.searchData}`);
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

export {
    getAllBookingsService,
    deleteBookingService,
    getDetailBookingService,
    getAvailableBookingService,
    createBookingService,
    getMedicalHistoryService,
    updateBookingService,
    searchBookingService,
}