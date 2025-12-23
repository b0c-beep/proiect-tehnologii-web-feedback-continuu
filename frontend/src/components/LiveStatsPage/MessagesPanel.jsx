import React, { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';

const MessagesPanel = ({ messages }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="messages-card">
            <h3 className="card-title">
                <MessageSquare size={18} />
                Messages ({messages.length})
            </h3>
            <div className="messages-list" ref={scrollRef}>
                {messages.length === 0 ? (
                    <p className="no-messages">No messages yet</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="message-bubble">
                            <p>{msg.text}</p>
                            <span className="msg-time">
                                {new Date(msg.createdAt).toLocaleTimeString('ro-RO', {
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessagesPanel;
