import React from "react";
import LoginButton from "./LoginButton";
import LoginDivider from "./LoginDivider";
import { clickJoinSession, clickAccessDashboard, clickRegister } from "@utils/login_api.js";
import { useState } from "react";

const LoginForm = ({ role }) => {
    const [accessCode, setAccessCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const handleJoinSession = (e) => {
        e.preventDefault();
        clickJoinSession(accessCode);
    }

    const handleAccessDashboard = (e) => {
        e.preventDefault();
        clickAccessDashboard(email, password);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        clickRegister(firstName, lastName, regEmail, regPassword);
    }

    return (
        <div className="form-inputs">
            {role === 'student' ? (
                <>
                    <div className="input-group">
                        <label className="input-label">Access Code</label>
                        <input type="text" placeholder="CODE" className="input-field text-center"
                            value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
                    </div>

                    <LoginButton text="Join Session" clickHandler={handleJoinSession} />
                </>
            ) : (
                <>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input type="email" placeholder="professor@university.edu" className="input-field"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" placeholder="Password" className="input-field"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <LoginButton text="Access Dashboard" clickHandler={handleAccessDashboard} />

                    <LoginDivider />

                    <div className="input-group">
                        <label className="input-label">First Name</label>
                        <input type="text" placeholder="First Name" className="input-field"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Last Name</label>
                        <input type="text" placeholder="Last Name" className="input-field"
                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input type="email" placeholder="professor@university.edu" className="input-field"
                            value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" placeholder="Password" className="input-field"
                            value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                    </div>

                    <LoginButton text="Register" clickHandler={handleRegister} />

                </>
            )}
        </div>
    );
};

export default LoginForm;
