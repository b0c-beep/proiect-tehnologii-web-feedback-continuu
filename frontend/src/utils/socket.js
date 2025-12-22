import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.SOCKET_URL || 'http://localhost:3000';

let socket = null;

export const connectSocket = () => {
    if(!socket) {
        socket = io(SOCKET_URL);
    }
    return socket;
};

export const joinActivity = (activityId) => {
    socket.emit('join-activity', activityId);
};

export const onNewFeedback = (callback) => {
    socket.on('new-feedback', callback);
};

export const onNewMessage = (callback) => {
    socket.on('new-message', callback);
};

export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect();
        socket = null;
    }
};