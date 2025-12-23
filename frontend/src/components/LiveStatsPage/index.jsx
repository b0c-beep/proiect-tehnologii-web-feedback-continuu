import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardNav from '../TeacherDashboardPage/DashboardNav';
import StatsHeader from './StatsHeader';
import CountersRow from './CountersRow';
import FeedbackBarChart from './FeedbackBarChart';
import MessagesPanel from './MessagesPanel';
import FeedbackTimeline from './FeedbackTimeline';
import { fetchActivity, fetchFeedbackStats, fetchFeedbackTimeline, fetchMessages } from '@utils/stats_api';
import { connectSocket, joinActivity, onNewFeedback, onNewMessage, disconnectSocket } from '@utils/socket';
import { exportToExcel } from '@utils/exportUtils';
import { toggleActivityStatus } from '@utils/dashboard_api';
import './LiveStatsPage.css';

const LiveStatsPage = () => {
    const { id: activityId } = useParams();
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const [user] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [activity, setActivity] = useState(null);
    const [stats, setStats] = useState({ smiley: 0, frowny: 0, surprised: 0, confused: 0, total: 0 });
    const [messages, setMessages] = useState([]);
    const [feedbackTimes, setFeedbackTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [activityData, statsData, timelineData, messagesData] = await Promise.all([
                    fetchActivity(activityId),
                    fetchFeedbackStats(activityId),
                    fetchFeedbackTimeline(activityId),
                    fetchMessages(activityId)
                ]);

                setActivity(activityData);
                setStats(statsData);
                setFeedbackTimes(timelineData.feedbacks || []);
                setMessages(messagesData);
            } catch (err) {
                console.error('Error loading stats:', err);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        loadData();

        // Socket.IO setup
        connectSocket();
        joinActivity(activityId);

        onNewFeedback((feedback) => {
            setStats(prev => ({
                ...prev,
                [feedback.type]: prev[feedback.type] + 1,
                total: prev.total + 1
            }));
            setFeedbackTimes(prev => [...prev, { type: feedback.type, createdAt: feedback.createdAt }]);
        });

        onNewMessage((message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            disconnectSocket();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activityId, navigate]);

    // Duration check effect
    useEffect(() => {
        if (!activity?.is_active || !activity?.started_at || !activity?.duration_minutes) {
            setTimeRemaining(null);
            return;
        }

        const checkDuration = async () => {
            const startTime = new Date(activity.started_at).getTime();
            const durationMs = activity.duration_minutes * 60 * 1000;
            const endTime = startTime + durationMs;
            const now = Date.now();
            const remaining = endTime - now;

            if (remaining <= 0) {
                // Time expired - auto stop
                clearInterval(timerRef.current);
                try {
                    await toggleActivityStatus(activityId, false);
                    setActivity(prev => ({ ...prev, is_active: false, started_at: null }));
                    alert(`Activity "${activity.title}" has ended. Duration of ${activity.duration_minutes} minutes has expired.`);
                } catch (err) {
                    console.error('Error auto-stopping activity:', err);
                }
                setTimeRemaining(null);
            } else {
                setTimeRemaining(Math.ceil(remaining / 1000));
            }
        };

        checkDuration();
        timerRef.current = setInterval(checkDuration, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activity?.is_active, activity?.started_at, activity?.duration_minutes, activityId]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleExport = () => {
        exportToExcel(
            stats,
            messages,
            feedbackTimes,
            activity?.title || 'activity',
            activity?.started_at || activity?.createdAt
        );
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="stats-page">
            <DashboardNav user={user} onLogout={handleLogout} />

            <main className="stats-main">
                <StatsHeader
                    activity={activity}
                    onExport={handleExport}
                    timeRemaining={timeRemaining}
                />
                <CountersRow stats={stats} />

                <div className="charts-row">
                    <FeedbackBarChart stats={stats} />
                    <MessagesPanel messages={messages} />
                </div>

                <FeedbackTimeline feedbackTimes={feedbackTimes} />
            </main>
        </div>
    );
};

export default LiveStatsPage;
