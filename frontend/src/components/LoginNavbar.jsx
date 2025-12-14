import React from "react";
import { Zap } from 'lucide-react';
import '@styles/LoginNavbar.css';

const LoginNavbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo-wrapper">
                    <div className="icon-box">
                        <Zap size={20} color="white" fill="white" />
                    </div>
                    <h1 className="brand-name">
                        Class<span className="brand-accent">Pulse</span>
                    </h1>
                </div>
            </div>
        </nav>
    );

};

export default LoginNavbar;