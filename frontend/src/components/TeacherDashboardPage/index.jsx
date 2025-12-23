import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchActivities, toggleActivityStatus } from '@utils/dashboard_api';
import { logout } from '@utils/login_api';
import './TeacherDashboardPage.css';
import DashboardNav from "./DashboardNav";
import DashboardContent from "./DashboardContent";
import CreateActivityModal from "./CreateActivityModal";

const TeacherDashboardPage = () => {
    const navigate = useNavigate(); // Navigation hook
    const [activities, setActivities] = useState([]); // Activities list
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [user, setUser] = useState(null); // User data
    const timerRef = useRef(null); // Timer reference

    // Load activities on mount
    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
            navigate('/');
            return;
        }

        const userData = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
        setUser(userData);
        loadActivities();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current); // Cleanup timer on unmount
        };
    }, []);

    // Auto-stop expired activities check
    useEffect(() => {
        const checkExpiredActivities = async () => {
            const now = Date.now();

            for (const activity of activities) {
                if (activity.is_active && activity.started_at && activity.duration_minutes) { // Check if activity is active and has start time and duration
                    const startTime = new Date(activity.started_at).getTime();
                    const durationMs = activity.duration_minutes * 60 * 1000; // Convert duration to milliseconds
                    const endTime = startTime + durationMs;

                    if (now >= endTime) {
                        try {
                            await toggleActivityStatus(activity.id, false); // Auto-stop activity
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

        checkExpiredActivities();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current); // Cleanup timer on unmount
        };
    }, [activities]);

    const loadActivities = async () => {
        try {
            const data = await fetchActivities(); // Fetch activities from API
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
