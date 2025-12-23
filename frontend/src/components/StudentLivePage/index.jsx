import React, { useEffect, useRef } from "react";
import LiveIndicator from './LiveIndicator';
import LeaveButton from './LeaveButton';
import ActivityInfo from './ActivityInfo';
import FeedbackGrid from "./FeedbackGrid";
import MessageModal from "./MessageModal";
import { connectSocket, joinActivity, disconnectSocket } from '@utils/socket';
import { checkActivityStatus } from '@utils/student_api';
import './StudentLivePage.css';
import { useNavigate } from "react-router-dom";

const StudentLivePage = () => {
    const navigate = useNavigate();
    const pollingRef = useRef(null); // Polling reference for activity status

    const activityId = localStorage.getItem('activityId'); // Activity ID
    const activityTitle = localStorage.getItem('activityTitle'); // Activity title

    useEffect(() => {
        if (!activityId) { // If no activity ID
            navigate('/'); // Navigate to home
            return;
        }

        connectSocket(); // Connect to socket
        joinActivity(activityId); // Join activity

        pollingRef.current = setInterval(async () => { // Polling for activity status
            try {
                const isActive = await checkActivityStatus(activityId); // Check activity status
                if (!isActive) {
                    clearInterval(pollingRef.current); // Clear polling
                    alert('This session has been ended by the teacher!'); // Alert user
                    localStorage.removeItem('activityId'); // Remove activity ID
                    localStorage.removeItem('activityTitle'); // Remove activity title
                    disconnectSocket(); // Disconnect socket
                    navigate('/'); // Navigate to home
                }
            } catch (error) {
                console.error('Error checking activity status:', error);
            }
        }, 4000); // Poll every 4 seconds

        return () => {
            clearInterval(pollingRef.current); // Clear polling
            disconnectSocket(); // Disconnect socket
        };
    }, [activityId, navigate]);

    if (!activityId) return null;

    return (
        <div className="student-live-wrapper">
            <header className="student-header">
                <LiveIndicator />
                <LeaveButton />
            </header>

            <main className="student-main">
                <ActivityInfo title={activityTitle} />
                <FeedbackGrid activityId={activityId} />
            </main>

            <MessageModal activityId={activityId} />
        </div>
    );
}

export default StudentLivePage;
