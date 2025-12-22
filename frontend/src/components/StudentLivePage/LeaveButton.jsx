import React from  'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { disconnectSocket } from '@utils/socket';

const LeaveButton = () => {
    const navigate = useNavigate();

    const handleLeave = () => {
        if(window.confirm('Are you sure you want to leave this session?')) {
            localStorage.removeItem('activityId');
            localStorage.removeItem('activityTitle');
            disconnectSocket();
            navigate('/');
        }
    };

    return (
        <>
            <button className='leave-btn' onClick={handleLeave}>
                <LogOut size={10}/>
                <span>Leave</span>
            </button>
        </>
    );
};

export default LeaveButton;