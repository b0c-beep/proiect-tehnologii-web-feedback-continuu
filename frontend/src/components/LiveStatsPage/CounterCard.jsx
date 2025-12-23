import React from 'react';

// Emoji configuration
const EMOJI_CONFIG = {
    smiley: { emoji: '😊', label: 'Happy', color: '#10b981' },
    frowny: { emoji: '😔', label: 'Bored', color: '#3b82f6' },
    surprised: { emoji: '😲', label: 'Surprised', color: '#f59e0b' },
    confused: { emoji: '😕', label: 'Confused', color: '#ef4444' }
};

const CounterCard = ({ type, count }) => {
    const config = EMOJI_CONFIG[type]; // Get emoji configuration

    return (
        <div className="counter-card" style={{ '--card-accent': config.color }}> // Set card accent color for emoji
            <span className="counter-emoji">{config.emoji}</span>
            <span className="counter-value">{count}</span>
            <span className="counter-label">{config.label}</span>
        </div>
    );
};

export default CounterCard;
