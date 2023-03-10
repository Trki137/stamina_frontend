import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";

import { routes } from "./api/paths";
import Home from "./pages/Home/Home";
import ProfileImageProvider from "./context/ProfileImageContext";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <ProfileImageProvider>
          <Navbar />
          <main className="flex flex-1">
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route element={<SignUp />} path={routes.signUp} />
              <Route element={<SignIn />} path={routes.signIn} />
            </Routes>
          </main>
          <Footer />
        </ProfileImageProvider>
      </Router>
    </div>
  );
}

export default App;
