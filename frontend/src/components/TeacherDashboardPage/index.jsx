import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchActivities, toggleActivityStatus} from '@utils/dashboard_api'; 
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/');
            return;
        }

        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        loadActivities();
    }, []);

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
                onCreateClick={() => {setShowModal(true);}}
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
