import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import StudentLivePage from "@components/StudentLivePage"
import TeacherDashboardPage from "@components/TeacherDashboardPage"
import LiveStatsPage from "@components/LiveStatsPage"
import LoginPage from "@components/LoginPage"


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
