import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Copy, BarChart3, Trash2 } from 'lucide-react';
import { deleteActivity } from '@utils/dashboard_api';

const ActivityCard = ({ activity, onToggleActive, onRefresh }) => {
    const navigate = useNavigate();

    const copyAccessCode = () => { // Copy access code in clipboard
        navigator.clipboard.writeText(activity.access_code);
        alert('Code copied!');
    };

    const handleToggle = () => {
        onToggleActive(activity.id, !activity.is_active);
    };

    const handleDeleteActivity = async () => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            try {
                await deleteActivity(activity.id);
                onRefresh(); // Refresh activities list
            } catch (error) {
                alert('Failed to delete activity');
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className={`activity-card ${activity.is_active ? 'active' : 'inactive'}`}>
                <div className='card-header'>
                    <h3 className='activity-title'>{activity.title}</h3>
                    <label className='toggle-switch'>
                        <input
                            type='checkbox'
                            checked={activity.is_active}
                            onChange={handleToggle} />
                        <span className='slider'></span>
                    </label>
                </div>

                <div className='access-code-section'>
                    <span className='code-label'>Access Code</span>
                    <div className='code-display'>
                        <span className='code'>{activity.access_code}</span>
                        <button className='copy-btn' onClick={copyAccessCode}>
                            <Copy size={16} />
                        </button>
                    </div>
                </div>

                <div className='card-footer'>
                    <span className='duration-badge'>
                        <Clock size={14} />
                        {activity.duration_minutes} min
                    </span>

                    <button
                        className='delete-btn'
                        onClick={handleDeleteActivity} >
                        <Trash2 size={16} />
                    </button>

                    <button
                        className='stats-btn'
                        onClick={() => navigate(`/activity/${activity.id}`)} >
                        <BarChart3 size={16} />
                        View Stats
                    </button>
                </div>
            </div>
        </>
    );
};

export default ActivityCard;