import React from "react";
import { navItem } from "../../@types/NavbarType";
import { Link } from "react-router-dom";

type MobileNavItemType = {
  navItem: navItem;
};
export default function MobileNavItem({ navItem }: MobileNavItemType) {
  return (
    <li>
      <Link
        to={navItem.link}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        {navItem.name}
      </Link>
    </li>
  );
}
