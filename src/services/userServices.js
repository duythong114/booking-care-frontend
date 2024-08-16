import axios from "../axiosConfig";

const registerUserService = async (userData) => {
    try {
        const response = await axios.post('/api/register', {
            fullname: userData.fullname,
            email: userData.email,
            phone: userData.phone,
            gender: userData.gender,
            dob: userData.dob,
            password: userData.password
        })
        return response
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export {
    registerUserService,
}