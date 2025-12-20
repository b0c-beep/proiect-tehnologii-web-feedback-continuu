import React from "react";
import ActivityCard from "./ActivityCard";

const ActivityList = ({ activities, onToggleActive, onRefresh }) => {
    return (
        <>
            <div className="activity-grid">
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onRefresh={onRefresh}
                        onToggleActive={onToggleActive} />
                ))}
            </div>
        </>
    );
};

export default ActivityList;