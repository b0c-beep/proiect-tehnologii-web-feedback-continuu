import React from 'react';

const FEEDBACK_CONFIG = {
    smiley: {emoji: '😊', label: 'Happy'},
    frowny:    { emoji: '😔', label: 'Bored' },
    surprised: { emoji: '😲', label: 'Surprised' },
    confused:  { emoji: '😕', label: 'Confused' }
};  

const FeedbackButton = ({ type, onClick, disabled }) => {
    const config = FEEDBACK_CONFIG[type];

    return (
        <>
            <button
                className={`feedback-btn feedback-${type}`}
                onClick={() => onClick(type)}
                disabled = {disabled}
            >
                <span className='feedback-emoji'>{config.emoji}</span>
                <span className='feedback-label'>{config.label}</span>
            </button>
        </>
    );
};

export default FeedbackButton;