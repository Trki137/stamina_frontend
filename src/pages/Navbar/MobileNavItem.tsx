import React from "react";
import { navItem } from "../../@types/NavbarType";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../api/paths";

type MobileNavItemType = {
  navItem: navItem;
};
export default function MobileNavItem({ navItem }: MobileNavItemType) {
  const navigate = useNavigate();
  const signOut = () => {
    if (navItem.name !== "Sign out") return;

    localStorage.removeItem("staminaUser");
    navigate(routes.home);
  };
  return (
    <li>
      <Link
        to={navItem.link}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={signOut}
      >
        {navItem.name}
      </Link>
    </li>
  );
}
