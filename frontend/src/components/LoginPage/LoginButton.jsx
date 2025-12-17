import React from 'react';
import { ArrowRight } from 'lucide-react';

const LoginButton = ({ text, clickHandler }) => {
    return (
        <button type="submit" className="join-btn" onClick={clickHandler}>
            {text}
            <ArrowRight size={20} className="btn-icon" strokeWidth={2.5} />
        </button>
    );
};

export default LoginButton;
