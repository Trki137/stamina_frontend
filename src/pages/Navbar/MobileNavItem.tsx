import React, { useContext } from "react";
import { navItem } from "../../@types/NavbarType";
import { Link } from "react-router-dom";
import { ProfileImageContext } from "../../context/ProfileImageContext";
import { Image } from "../../@types/UserType";

type MobileNavItemType = {
  navItem: navItem;
};
export default function MobileNavItem({navItem}: MobileNavItemType) {
    const {setImage} = useContext(ProfileImageContext) as Image;
    const signOut = () => {
        if (navItem.name !== "Sign out") return;

        setImage("");
        localStorage.removeItem("staminaUser");
        window.location.reload();
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
