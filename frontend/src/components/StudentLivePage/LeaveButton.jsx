import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { disconnectSocket } from '@utils/socket';

const LeaveButton = () => {
    const navigate = useNavigate();

    // Handle leave
    const handleLeave = () => {
        if (window.confirm('Are you sure you want to leave this session?')) { // Confirm leave
            localStorage.removeItem('activityId'); // Remove activity ID
            localStorage.removeItem('activityTitle'); // Remove activity title
            disconnectSocket(); // Disconnect socket
            navigate('/'); // Navigate to home
        }
    };

    return (
        <>
            <button className='leave-btn' onClick={handleLeave}>
                <LogOut size={10} />
                <span>Leave</span>
            </button>
        </>
    );
};

export default LeaveButton;