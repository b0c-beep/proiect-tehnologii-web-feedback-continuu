import React from "react";
import "@styles/LoginContent.css";
import LoginCardLeft from "@components/LoginCardLeft";
import LoginCardRight from "@components/LoginCardRight";

const LoginContent = () => {
    return (
        <main className="content-wrapper">
            <div className="login-card">
                <LoginCardLeft />
                <LoginCardRight />
            </div>
        </main>
    );
};

export default LoginContent;