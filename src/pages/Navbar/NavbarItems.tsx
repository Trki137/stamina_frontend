import React from "react";
import { navItem } from "../../@types/NavbarType";

type NavbarItems = {
  mobileVersion: boolean;
  navItem: navItem;
};
export default function NavbarItems({ mobileVersion, navItem }: NavbarItems) {
  return (
    <React.Fragment>
      {mobileVersion ? (
        <li className="uppercase text-white py-4 cursor-pointer hover:bg-[#2C3527]">
          {navItem.name}
        </li>
      ) : (
        <li className="px-2 uppercase text-white">{navItem.name}</li>
      )}
    </React.Fragment>
  );
}
