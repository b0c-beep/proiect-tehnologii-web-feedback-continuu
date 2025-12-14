import axios from 'axios';

const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const clickJoinSession = async (accessCode) => {
    try {
        const response = await api.post('/activities/join', { access_code: accessCode });
        return response.data;
    } catch (error) {
        console.error('Error joining session:', error);
        throw error;
    }
};
export const clickAccessDashboard = (email, password) => {};
export const clickRegister = (email, password) => {};