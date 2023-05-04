import React, { Dispatch, SetStateAction } from "react";
import { navItem } from "../../@types/NavbarType";
import { Link } from "react-router-dom";

type MobileNavItemType = {
  navItem: navItem;
  setUser: Dispatch<SetStateAction<boolean>>;
};
export default function MobileNavItem({ navItem, setUser }: MobileNavItemType) {
  const signOut = () => {
    if (navItem.name !== "Sign out") return;

    setUser(false);
    localStorage.removeItem("staminaUser");
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
