import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const COLORS = {
    smiley: '#10b981',
    frowny: '#3b82f6',
    surprised: '#f59e0b',
    confused: '#ef4444'
};

const FeedbackBarChart = ({ stats }) => {
    const data = [
        { name: '😊', value: stats.smiley, type: 'smiley' },
        { name: '😔', value: stats.frowny, type: 'frowny' },
        { name: '😲', value: stats.surprised, type: 'surprised' },
        { name: '😕', value: stats.confused, type: 'confused' }
    ];

    return (
        <div className="chart-card">
            <h3 className="chart-title">Feedback Distribution</h3>
            <div className="chart-container">
                // Responsive container for chart
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" tick={{ fontSize: 20 }} /> // X axis
                        <YAxis allowDecimals={false} /> // Y axis
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}> // Bar chart
                            {data.map((entry) => (
                                <Cell key={entry.type} fill={COLORS[entry.type]} /> // Cell with color
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FeedbackBarChart;
