import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../api/paths";

export default function PrivateRoute() {
  const user = localStorage.getItem("staminaUser");

  return user ? <Outlet /> : <Navigate to={routes.SIGN_IN} />;
}
