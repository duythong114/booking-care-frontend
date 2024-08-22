import axios from "../axiosConfig";

const registerUserService = async (userData) => {
    try {
        const response = await axios.post('/api/user/register', {
            fullName: userData.fullName,
            email: userData.email,
            phone: "0123456789",
            gender: userData.gender,
            dob: userData.dob,
            address: "vietnam",
            password: userData.password,
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

const loginUserService = async (userData) => {
    try {
        const response = await axios.get(`/api/user/login?email=${userData.email}&password=${userData.password}`);
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

const getUserInfoService = async () => {
    try {
        const response = await axios.get('/api/user/get-user');
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

const getAllUserService = async (pagination) => {
    try {
        const response = await axios.get(`/api/user/get-all?current=${pagination.current}&pageSize=${pagination.pageSize}`);
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

const deleteUserService = async (userId) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/user/delete/${userId}`);
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
    registerUserService,
    loginUserService,
    getUserInfoService,
    getAllUserService,
    deleteUserService,
}