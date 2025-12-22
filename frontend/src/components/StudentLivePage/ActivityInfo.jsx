import React from 'react';

const ActivityInfo = ({ title }) => {
    return (
        <>
            <div className='activity-info'>
                <h1 className='activity-title'>{title}</h1>
            </div>
        </>
    );
};

export default ActivityInfo;