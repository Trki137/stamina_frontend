import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";

import { routes } from "./api/paths";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex flex-1">
          <Routes>
            <Route element={<SignUp />} path={routes.signUp} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
