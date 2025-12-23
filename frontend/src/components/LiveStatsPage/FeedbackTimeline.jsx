import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const FeedbackTimeline = ({ feedbackTimes }) => {
    const data = useMemo(() => {
        if (!feedbackTimes || feedbackTimes.length === 0) return [];

        // Get the earliest feedback timestamp as reference
        const allTimes = feedbackTimes.map(f =>
            new Date(typeof f === 'string' ? f : f.createdAt).getTime()
        ).sort((a, b) => a - b);

        const startTime = allTimes[0];
        const minuteMap = {};

        feedbackTimes.forEach((feedback) => {
            const time = typeof feedback === 'string' ? feedback : feedback.createdAt;
            const minutes = Math.floor((new Date(time).getTime() - startTime) / 60000);
            if (minutes >= 0) {
                minuteMap[minutes] = (minuteMap[minutes] || 0) + 1;
            }
        });

        if (Object.keys(minuteMap).length === 0) return [];

        const maxMinute = Math.max(...Object.keys(minuteMap).map(Number));
        const result = [];

        for (let i = 0; i <= maxMinute; i++) {
            result.push({ minute: i, count: minuteMap[i] || 0 });
        }

        return result;
    }, [feedbackTimes]);

    if (data.length === 0) {
        return (
            <div className="timeline-card">
                <h3 className="chart-title">Feedback Per Minute</h3>
                <p className="no-data">No feedback data yet</p>
            </div>
        );
    }

    return (
        <div className="timeline-card">
            <h3 className="chart-title">Feedback Per Minute</h3>
            <div className="chart-container-timeline">
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="minute"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            label={{ value: 'Minute', position: 'bottom', offset: 10, fill: '#64748b' }}
                        />
                        <YAxis
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            allowDecimals={false}
                            label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                            labelFormatter={(val) => `Minute ${val}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={{ fill: '#8b5cf6', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FeedbackTimeline;
