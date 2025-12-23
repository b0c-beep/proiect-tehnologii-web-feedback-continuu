import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchActivity = async (activityId) => {
    const response = await axios.get(`${API_URL}/activities/${activityId}`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const fetchFeedbackStats = async (activityId) => {
    const response = await axios.get(`${API_URL}/feedback/${activityId}/stats`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const fetchFeedbackTimeline = async (activityId) => {
    const response = await axios.get(`${API_URL}/feedback/${activityId}/timeline`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const fetchMessages = async (activityId) => {
    const response = await axios.get(`${API_URL}/messages/${activityId}`, {
        headers: getAuthHeader()
    });
    return response.data;
};
