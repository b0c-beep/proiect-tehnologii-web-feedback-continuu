import React from 'react';
import { ArrowLeft, Radio, Download, Clock, Key, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatsHeader = ({ activity, onExport, timeRemaining }) => {
    const navigate = useNavigate();

    const formatTime = (dateString) => {
        if (!dateString) return 'Not started';
        return new Date(dateString).toLocaleTimeString('ro-RO', {
            hour: '2-digit', minute: '2-digit'
        });
    };

    const formatRemaining = (seconds) => {
        if (!seconds) return null;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="stats-header">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={20} />
            </button>

            <div className="header-left">
                <h1 className="activity-title">{activity?.title}</h1>
                <div className="header-meta">
                    {activity?.is_active && (
                        <span className="live-badge">
                            <Radio size={10} className="pulse" /> LIVE
                        </span>
                    )}
                    <span className="meta-item">
                        <Key size={14} /> {activity?.access_code}
                    </span>
                    <span className="meta-item">
                        <Clock size={14} /> Started: {formatTime(activity?.started_at)}
                    </span>
                    {timeRemaining && (
                        <span className="meta-item time-remaining">
                            <Timer size={14} /> {formatRemaining(timeRemaining)} remaining
                        </span>
                    )}
                </div>
            </div>

            <button className="export-btn" onClick={onExport}>
                <Download size={18} />
                <span>Export XLSX</span>
            </button>
        </div>
    );
};

export default StatsHeader;
