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

const registerPatientService = async (userData) => {
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
        handleError(error)
    }
}

const registerDoctorService = async (doctorData) => {
    try {
        const response = await axios.post('/api/user/doctor/register', {
            fullName: doctorData.fullName,
            email: doctorData.email,
            phone: "0123456789",
            gender: doctorData.gender,
            dob: "0000-00-00",
            address: "vietnam",
            password: doctorData.password,
        });
        return response;
    } catch (error) {
        handleError(error)
    }
}

const loginUserService = async (userData) => {
    try {
        const response = await axios.get(`/api/user/login?email=${userData.email}&password=${userData.password}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

const getUserInfoService = async () => {
    try {
        const response = await axios.get('/api/user/get-user');
        return response;
    } catch (error) {
        handleError(error)
    }
};

const getAllUserService = async (pagination) => {
    try {
        const response = await axios.get(`/api/user?page=${pagination.page}&size=${pagination.size}&sort=id,${pagination.sortOrder}`);
        return response;
    } catch (error) {
        handleError(error)
    }
};

const deleteUserService = async (userId) => {
    try {
        const response = await axios.delete(`/api/user/delete/${userId}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

const getDetailUserService = async (userId) => {
    try {
        const response = await axios.get(`/api/user/find-user?id=${userId}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

const editUserService = async (userData) => {
    try {
        const response = await axios.put('/api/user/update', {
            password: userData.password,
            phone: userData.phone,
            gender: userData.gender,
            address: userData.address,
            dob: userData.dob,
            fullName: userData.fullName,
        });
        return response;
    } catch (error) {
        handleError(error)
    }
}

const uploadAvatarService = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post('/api/user/upload-image',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response;
    } catch (error) {
        handleError(error)
    }
}

const searchUserService = async (searchPayload) => {
    try {
        const response = await axios.get(`/api/user?page=${searchPayload.page}&size=${searchPayload.size}&name=${searchPayload.searchData}`);
        return response;
    } catch (error) {
        handleError(error)
    }
}

export {
    registerPatientService,
    registerDoctorService,
    loginUserService,
    getUserInfoService,
    getAllUserService,
    deleteUserService,
    getDetailUserService,
    editUserService,
    uploadAvatarService,
    searchUserService,
}