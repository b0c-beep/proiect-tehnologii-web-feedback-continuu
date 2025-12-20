import React from 'react';
import { Plus } from 'lucide-react';
import EmptyState from './EmptyState';
import ActivityList from './ActivityList';

const DashboardContent = ({ activities, isLoading, onCreateClick, onRefresh, onToggleActive }) => {
    if (isLoading) {
        return (
            <main className='dashboard-content'>
                <div className='loading-spinner'>Loading...</div>
            </main>
        );
    }

    return (
        <>
            <main className='dashboard-content'>
                <div className='content-header'>
                    <h2>Your Activities</h2>
                    <button className='create-btn' onClick={onCreateClick}>
                        <Plus size={20}/>
                        New Activity
                    </button>
                </div>

                {activities.length === 0 ? (
                    <EmptyState onCreateClick={onCreateClick} />
                ) : (
                    <ActivityList
                        activities={activities}
                        onRefresh={onRefresh}
                        onToggleActive={onToggleActive}
                    />
                )}
            </main>
        </>
    );
};

export default DashboardContent;