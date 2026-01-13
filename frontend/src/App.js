import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DynamicData from "./pages/DynamicData";
import AnalyticsHub from "./pages/AnalyticsHub";
import AutoDashboard from "./pages/AutoDashboard";
import ManualDashboard from "./pages/ManualDashboard";
import AllInsights from "./pages/AllInsights";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Hub */}
        <Route path="/analytics-hub" element={<AnalyticsHub />} />

        {/* Modules */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-clean" element={<DynamicData />} />
        <Route path="/auto-dashboard" element={<AutoDashboard />} />
        <Route path="/manual-dashboard" element={<ManualDashboard />} />

        {/* 🔥 Module 5 – AI Insights */}
        <Route path="/ai-insights" element={<AllInsights />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
