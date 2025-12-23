import { useState } from "react";
import { X } from 'lucide-react';
import { createActivity } from '@utils/dashboard_api';

const CreateActivityModal = ({ isOpen, onClose, onCreated }) => {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(30);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (isOpen === false) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (title.length < 5) {
            setError('Title must be at least 5 characters!');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createActivity(title, duration);
            onCreated(result.activity);
            setTitle('');
            setDuration(30);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create activity.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className='modal-overlay' onClick={onClose}>
                <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                    <button className='modal-close' onClick={onClose}>
                        <X size={24} />
                    </button>

                    <h2>Create New Activity</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Activity Title</label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Curs Tehnologii Web - Intro React" />
                        </div>

                        <div className='form-group'>
                            <label>Duration (minutes)</label>
                            <input
                                type='number'
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                min={1}
                                max={120} />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}>
                            {isSubmitting ? 'Creating ... ' : 'Create Activity'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateActivityModal;