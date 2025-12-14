import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import StudentLivePage from "@pages/StudentLive/StudentLivePage.jsx"
import TeacherDashboardPage from "@pages/TeacherDashboard/TeacherDashboardPage.jsx"
import LiveStatsPage from "@pages/LiveStats/LiveStatsPage.jsx"
import LoginPage from "@pages/Login/LoginPage.jsx"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<TeacherDashboardPage />} />
        <Route path="/activity/:id" element={<LiveStatsPage />} />

        <Route path="/live" element={<StudentLivePage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
