import React from 'react';
import { Radio } from 'lucide-react';

const LiveIndicator = () => {
    return (
        <div className='live-indicator'>
            <Radio size={14} className='pulse-icon' />
            <span>LIVE</span>
        </div>
    );
};

export default LiveIndicator;