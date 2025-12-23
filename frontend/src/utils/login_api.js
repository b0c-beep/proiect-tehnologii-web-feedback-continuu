import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const clickJoinSession = async (accessCode) => {
    try {
        const response = await api.post('/activities/join', { access_code: accessCode });

        if (response.data.success) {
            // Store activity info and redirect to live page
            localStorage.setItem('activityId', response.data.activityId);
            localStorage.setItem('activityTitle', response.data.title);
            window.location.href = '/live';
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error joining session';
        alert(errorMessage);
        console.error('Error joining session:', error);
        throw error;
    }
};


export const clickAccessDashboard = async (email, password) => {
    try {
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        const response = await api.post('/auth/login', { email, password });

        // Store JWT token and user info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to teacher dashboard
        window.location.href = '/dashboard';

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Login failed';
        alert(errorMessage);
        console.error('Error logging in:', error);
        throw error;
    }
};


export const clickRegister = async (firstName, lastName, email, password) => {
    try {
        if (!firstName || !lastName || !email || !password) {
            alert('Please fill in all registration fields');
            return;
        }

        const response = await api.post('/auth/register', {
            firstName,
            lastName,
            email,
            password
        });

        alert('Registration successful! You can now login.');

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Registration failed';
        alert(errorMessage);
        console.error('Error registering:', error);
        throw error;
    }
};


export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
};