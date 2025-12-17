import React from "react";
import { useState } from "react";
import RoleSwitcher from "./RoleSwitcher";
import LoginForm from "./LoginForm";

const LoginCardRight = () => {
    const [role, setRole] = useState("student");

    return (
        <div className="right-panel">
            <RoleSwitcher currentRole={role} onRoleChange={setRole} />
            <form className="login-form">
                <LoginForm role={role} />
            </form>
        </div>
    );
}

export default LoginCardRight;
