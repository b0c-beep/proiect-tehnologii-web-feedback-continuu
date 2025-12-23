import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { sendMessage } from '@utils/student_api';

const MessageModal = ({ activityId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!message.trim()) return; // If no message

        setIsSubmitting(true); // Set submitting state
        try {
            await sendMessage(activityId, message); // Send message
            setMessage('');
            setIsOpen(false);
        } catch (error) {
            alert('Failed to send message!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button className='message-fab' onClick={() => setIsOpen(true)}>
                <MessageCircle size={24} />
            </button>

            {isOpen && ( // If modal is open
                <div className='modal-overlay' onClick={() => setIsOpen(false)}>
                    <div className='message-modal' onClick={(e) => e.stopPropagation()}>
                        <button className='modal-close' onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>

                        <h2>Send a Message</h2>
                        <p className='modal-subtitle'>Ask a question or share your thoughts!</p>

                        <form onSubmit={handleSubmit}>
                            <textarea
                                className='message-input'
                                placeholder='Type your message here...'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                            />

                            <button
                                type='submit'
                                className='send-btn'
                                disabled={isSubmitting || !message.trim()}
                            >
                                <Send size={18} />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageModal;