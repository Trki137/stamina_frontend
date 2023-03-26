import React, { useState } from "react";
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
import SearchSidebar from "./pages/SearchSidebar/SearchSidebar";
import Exercise from "./pages/Exercise/Exercise";
import Profile from "./pages/Profile/Profile";
import AddWorkout from "./pages/AddWorkout/AddWorkout";
import AddTraining from "./pages/AddTraining/AddTraining";

function App() {
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const handleSearchActiveChange = () => {
    setSearchActive((prevSearchActive) => !prevSearchActive);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <ProfileImageProvider>
          <Navbar handleSearchActiveChange={handleSearchActiveChange} />
          <SearchSidebar
            searchActive={searchActive}
            handleSearchActiveChange={handleSearchActiveChange}
          />
          <main className="flex flex-1">
            <Routes>
              <Route element={<Home />} path={routes.home} />
              <Route element={<SignUp />} path={routes.signUp} />
              <Route element={<SignIn />} path={routes.signIn} />
              <Route element={<Exercise />} path={routes.workout} />
              <Route element={<AddWorkout />} path={routes.addWorkout} />
              <Route element={<AddTraining />} path={routes.createTraining} />
              <Route element={<Profile />} path={`${routes.profile}/:id`} />
            </Routes>
          </main>
          <Footer />
        </ProfileImageProvider>
      </Router>
    </div>
  );
}

export default App;
