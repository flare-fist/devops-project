import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import DailyChoices from "./pages/DepressionTest"; // repurposed as Daily Choices
import ImpactResult from "./pages/DepressionResult"; // repurposed as Impact / Rewards
import Login from "./pages/Login";
import Register from "./pages/Register";
import AutoLogout from "./components/AutoLogout";
export default function App() {
  return (
    <BrowserRouter>
      <AutoLogout />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choices" element={<DailyChoices />} />
        <Route path="/impact" element={<ImpactResult />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
