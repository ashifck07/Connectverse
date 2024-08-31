import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forgotpassword from "./Components/Forgotpassword";
import ResetPassword from "./Components/Loginandsignup/ReserPassword";
import LoginSignup from "./Components/Loginandsignup/LoginSignup";
import Dashboard from "./Components/Loginandsignup/Dashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        {" "}
        <div className="container mx-auto px-4 py-8">
          {" "}
          <Routes>
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
