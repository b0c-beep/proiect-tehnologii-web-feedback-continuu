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
    const pollingRef = useRef(null);

    const activityId = localStorage.getItem('activityId');
    const activityTitle = localStorage.getItem('activityTitle');

    useEffect(() => {
        if(!activityId) {
            navigate('/');
            return;
        }

        connectSocket();
        joinActivity(activityId);

        pollingRef.current = setInterval(async () => {
            try {
                const isActive = await checkActivityStatus(activityId);
                if(!isActive) {
                    clearInterval(pollingRef.current);
                    alert('This session has been ended by the teacher!');
                    localStorage.removeItem('activityId');
                    localStorage.removeItem('activityTitle');
                    disconnectSocket();
                    navigate('/');
                }
            } catch (error) {
                console.error('Error checking activity status:', error);
            }
        },4000);

        return () => {
            clearInterval(pollingRef.current);
            disconnectSocket();
        };
    }, [activityId, navigate]);

    if(!activityId) return null;

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
