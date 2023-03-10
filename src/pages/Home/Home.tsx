import React, { useEffect, useState } from "react";
import { User } from "../../@types/UserType";
import HomeRegistered from "./HomeRegistered";
import HomeNotRegistered from "./HomeNotRegistered";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("staminaUser");
    setUser(userData ? JSON.parse(userData) : null);
  }, [useLocation().pathname]);

  return (
    <React.Fragment>
      {user ? <HomeRegistered /> : <HomeNotRegistered />}
    </React.Fragment>
  );
}
