import React from 'react';
import { User, GraduationCap } from 'lucide-react';
import '@styles/RoleSwitcher.css';

const RoleSwitcher = ({ currentRole, onRoleChange }) => {
  return (
    <div className="role-switcher">
      <button 
        type="button"
        className={`role-tab ${currentRole === 'student' ? 'active' : ''}`}
        onClick={() => onRoleChange('student')}
      >
        <User size={18} />
        <span>Student</span>
      </button>
      
      <button 
        type="button"
        className={`role-tab ${currentRole === 'teacher' ? 'active' : ''}`}
        onClick={() => onRoleChange('teacher')}
      >
        <GraduationCap size={18} />
        <span>Teacher</span>
      </button>
    </div>
  );
};

export default RoleSwitcher;