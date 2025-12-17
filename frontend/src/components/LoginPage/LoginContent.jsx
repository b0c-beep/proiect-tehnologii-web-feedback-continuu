import React from "react";
import LoginCardLeft from "./LoginCardLeft";
import LoginCardRight from "./LoginCardRight";

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
