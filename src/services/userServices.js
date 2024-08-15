import axios from "../axiosConfig";

const testApi = async () => {
    try {
        const response = await axios.get('/api/v1/students');
        return response;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

export {
    testApi,
}