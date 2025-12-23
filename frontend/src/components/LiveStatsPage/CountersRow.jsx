import React from 'react';
import CounterCard from './CounterCard';

const CountersRow = ({ stats }) => (
    <div className="counters-row">
        <CounterCard type="smiley" count={stats.smiley} />
        <CounterCard type="frowny" count={stats.frowny} />
        <CounterCard type="surprised" count={stats.surprised} />
        <CounterCard type="confused" count={stats.confused} />
    </div>
);

export default CountersRow;
