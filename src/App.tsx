import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./pages/Navbar/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes></Routes>
      </Router>
    </div>
  );
}

export default App;
