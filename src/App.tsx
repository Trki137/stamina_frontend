import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex flex-1">
          <Routes></Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
