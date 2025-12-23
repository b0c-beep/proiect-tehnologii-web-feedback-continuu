import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchActivities = async () => {
    const response = await axios.get(`${API_URL}/activities`, {
        headers: getAuthHeader()
    });
    return response.data;
};

export const createActivity = async (title, duration_minutes) => {
    const response = await axios.post(`${API_URL}/activities`,
        { title, duration_minutes },
        { headers: getAuthHeader() });
    return response.data;
};

export const toggleActivityStatus = async (id, is_active) => {
    const response = await axios.patch(`${API_URL}/activities/${id}`,
        { is_active },
        { headers: getAuthHeader() });
    return response.data;
};

export const deleteActivity = async (id) => {
    const response = await axios.delete(`${API_URL}/activities/${id}`, { headers: getAuthHeader() });
    return response.data;
}