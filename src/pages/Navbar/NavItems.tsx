import React from "react";

import { Link } from "react-router-dom";
import { navItem } from "../../@types/NavbarType";

type NavItemsType = {
  mobileVersion: boolean;
  navItem: navItem;
};

export default function NavItems({ mobileVersion, navItem }: NavItemsType) {
  return (
    <React.Fragment>
      {mobileVersion ? (
        <li className="uppercase text-white py-4 cursor-pointer hover:bg-[#2C3527]">
          <Link to={navItem.link}>{navItem.name}</Link>
        </li>
      ) : (
        <li className="px-2 uppercase text-white">
          <Link to={navItem.link}>{navItem.name}</Link>
        </li>
      )}
    </React.Fragment>
  );
}
