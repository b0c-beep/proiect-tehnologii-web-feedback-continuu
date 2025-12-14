import React from "react";
import Navbar from "@components/LoginNavbar.jsx";
import Footer from "@components/Footer.jsx";
import LoginContent from "@components/LoginContent";

const LoginPage = () => {
    return (
        <div>
            <Navbar />
            <LoginContent />
            <Footer />
        </div>
    );
};

export default LoginPage;