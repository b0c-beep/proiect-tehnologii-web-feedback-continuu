import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchActivities, toggleActivityStatus } from '@utils/dashboard_api';
import { logout } from '@utils/login_api';
import './TeacherDashboardPage.css';
import DashboardNav from "./DashboardNav";
import DashboardContent from "./DashboardContent";
import CreateActivityModal from "./CreateActivityModal";

const TeacherDashboardPage = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [isAlerted, setIsAlerted] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        loadActivities();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Auto-stop expired activities check
    useEffect(() => {
        const checkExpiredActivities = async () => {
            const now = Date.now();

            for (const activity of activities) {
                if (activity.is_active && activity.started_at && activity.duration_minutes) {
                    const startTime = new Date(activity.started_at).getTime();
                    const durationMs = activity.duration_minutes * 60 * 1000;
                    const endTime = startTime + durationMs;

                    if (now >= endTime) {
                        try {
                            await toggleActivityStatus(activity.id, false);
                            if (isAlerted === false) {
                                alert(`Activity "${activity.title}" has ended automatically. Duration of ${activity.duration_minutes} minutes expired.`);
                                setIsAlerted(true);
                            }


                            loadActivities();
                        } catch (err) {
                            console.error('Error auto-stopping activity:', err);
                        }
                    }
                }
            }
        };

        // Check every 5 seconds
        timerRef.current = setInterval(checkExpiredActivities, 5000);

        // Also check immediately
        checkExpiredActivities();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activities]);

    const loadActivities = async () => {
        try {
            const data = await fetchActivities();
            setActivities(data);
        } catch (error) {
            console.error('Failed to load activities');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleActive = async (id, newStatus) => {
        await toggleActivityStatus(id, newStatus);
        loadActivities();
    }

    const handleActivityCreated = (newActivity) => {
        setActivities([newActivity, ...activities]);
        setShowModal(false);
    };


    return (
        <div className="dashboard-wrapper">
            <DashboardNav user={user} onLogout={logout} />
            <DashboardContent
                activities={activities}
                isLoading={isLoading}
                onCreateClick={() => { setShowModal(true); }}
                onRefresh={loadActivities}
                onToggleActive={handleToggleActive} />

            <CreateActivityModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreated={handleActivityCreated} />
        </div>
    );
}

export default TeacherDashboardPage;
