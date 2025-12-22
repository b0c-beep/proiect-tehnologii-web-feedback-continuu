import React, { useState } from 'react';
import FeedbackButton from './FeedbackButton';
import { submitFeedback } from '@utils/student_api';

const FeedbackGrid = ({ activityId }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFeedback = async (type) => {
        try {
            await submitFeedback(activityId, type);
        } catch (error) {
            alert('Failed to send feedback!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className='feedback-section'>

                <div className='feedback-grid'>
                    {['smiley', 'frowny', 'surprised', 'confused'].map((type) => (
                        <FeedbackButton
                            key = {type}
                            type={type}
                            onClick={handleFeedback}
                            disabled={isSubmitting} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FeedbackGrid;