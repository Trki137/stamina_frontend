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
import SearchSidebar from "./pages/SearchSidebar/SearchSidebar";
import Exercise from "./pages/Exercise/Exercise";
import Profile from "./pages/Profile/Profile";
import AddWorkout from "./pages/AddWorkout/AddWorkout";
import AddTraining from "./pages/AddTraining/AddTraining";
import ChooseTraining from "./pages/ChooseTraining/ChooseTraining";
import MyData from "./pages/MyData/MyData";
import Event from "./pages/Events/Event";
import InputData from "./pages/InputData/InputData";
import Training from "./pages/Training/Training";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(
    localStorage.getItem("staminaUser") !== null
  );
  const handleSearchActiveChange = () => {
    setSearchActive((prevSearchActive) => !prevSearchActive);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar
          userSetter={setUser}
          userBoolean={user}
          handleSearchActiveChange={handleSearchActiveChange}
        />
        <SearchSidebar
          user={user}
          searchActive={searchActive}
          handleSearchActiveChange={handleSearchActiveChange}
        />
        <main className="flex flex-1">
          <Routes>
            <Route element={<Home />} path={routes.HOME} />
            <Route element={<SignUp />} path={routes.SIGN_UP} />
            <Route
              element={<SignIn userSetter={setUser} />}
              path={routes.SIGN_IN}
            />
            <Route element={<Exercise />} path={routes.WORKOUT} />
            <Route element={<AddWorkout />} path={routes.ADD_WORKOUT} />
            <Route element={<AddTraining />} path={routes.CREATE_TRAINING} />
            <Route element={<Profile />} path={`${routes.PROFILE}/:id`} />
            <Route element={<ChooseTraining />} path={routes.CHOOSE_TRAINING} />
            <Route element={<MyData />} path={routes.MY_DATA} />
            <Route element={<Event />} path={routes.EVENTS} />
            <Route element={<InputData />} path={routes.INPUT_DATA} />
            <Route element={<Training />} path={routes.TRAIN} />
            <Route
              element={<PageNotFound />}
              path={routes.PAGE_NOT_FOUND_URL}
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
