import React from 'react';
import { Zap, LogOut } from 'lucide-react';

const DashboardNav = ({ user, onLogout }) => {
    return (
        <>
            <nav className='dashboard-navbar'>
                <div className='navbar-container'>
                    {/* Logo */}
                    <div className='logo-wrapper'>
                        <div className='icon-box'>
                            <Zap size={20} color='white' fill='white' />
                        </div>
                        <h1 className='brand-name'>
                            Class<span className='brand-accent'>Pulse</span>
                        </h1>
                    </div>

                    {/* User Section */}
                    <div className='user-section'>
                        <span className='user-greeting'>
                            Prof. {user?.firstName || 'N/A'}
                        </span>
                        <button className='logout-btn' onClick={onLogout}>
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default DashboardNav;