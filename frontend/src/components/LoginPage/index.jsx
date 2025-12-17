import React from "react";
import LoginNavbar from "./LoginNavbar";
import Footer from "./Footer";
import LoginContent from "./LoginContent";
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="login-page-wrapper">
            <LoginNavbar />
            <LoginContent />
            <Footer />
        </div>
    );
};

export default LoginPage;
