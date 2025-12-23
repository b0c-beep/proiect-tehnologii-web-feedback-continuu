import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const submitFeedback = async (activityId, type) => {
    const response = await axios.post(`${API_URL}/feedback`, {
        activityId,
        type
    });
    return response.data;
};

export const sendMessage = async (activityId, text) => {
    const response = await axios.post(`${API_URL}/messages`, {
        activityId,
        text
    });
    return response.data;
};

export const checkActivityStatus = async (activityId) => {
    const response = await axios.get(`${API_URL}/activities/${activityId}/status`);
    return response.data.is_active;
};