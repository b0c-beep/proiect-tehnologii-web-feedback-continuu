import React from 'react';
import { FileQuestion, Plus } from 'lucide-react';

const EmptyState = ({ onCreateClick }) => {
    return (
        <div className='empty-state'>
            <div className='empty-icon'>
                <FileQuestion size={64} strokeWidth={1.5} />
            </div>

            <h3>No activities yet</h3>
            <p>Create your first activity to start collecting feedback from students.</p>

            <button className='create-first-btn' onClick={onCreateClick}>
                <Plus size={20} />
                Create Activity
            </button>
        </div>
    );
};

export default EmptyState;

